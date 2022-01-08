import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import {TrackContext} from '../contexts/TrackContext';
import TrackPlayer, {useProgress, Capability} from 'react-native-track-player';
import {PlayingContext} from '../contexts/PlayingContext';
import {app} from '../config/firebase';
import {getFirestore, collection, getDoc, doc} from 'firebase/firestore/lite';
import LinearGradient from 'react-native-linear-gradient';
const {width: wWidth, height: wHeight} = Dimensions.get('window');

const MacroPlayer = ({_onMinimizeClick}) => {
  const [playing, setPlaying] = useContext(PlayingContext);
  const [currentTrackId, setCurrentTrackId] = useContext(TrackContext);
  const [currentTrack, setCurrentTrack] = useState();
  const {position, duration} = useProgress();
  const db = getFirestore(app);

  const handleSliderChange = val => {
    TrackPlayer.seekTo(val);
  };

  const formatTrackTime = secs => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs - minutes * 60);
    if (seconds < 10) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
  };

  TrackPlayer.updateOptions({
    // Media controls capabilities
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
    // Capabilities that will show up when the notification is in the compact form on Android
    compactCapabilities: [Capability.Play, Capability.Pause],
  });

  const getCurrentTrack = async () => {
    const docRef = doc(db, 'songs', currentTrackId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCurrentTrack(docSnap.data());
      console.warn('Document data:', docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.warn('No such document!');
    }
  };

  const playTrack = async () => {
    //console.warn(currentTrack);
    // Set up the player
    await TrackPlayer.setupPlayer();

    // Add a track to the queue
    await TrackPlayer.add({
      id: 'Track Id',
      url: currentTrack?.file,
      title: currentTrack?.name,
      artist: currentTrack?.artist,
      artwork: currentTrack?.artwork,
    });

    // Start playing it
    await TrackPlayer.play();
    // navigation.navigate('PlayingScreen');
  };

  const onPlay = () => {
    setPlaying(true);
    // console.warn(playing);
    playTrack();
  };
  const onPause = () => {
    setPlaying(false);
    TrackPlayer.pause();
    // console.warn(playing);
  };

  useEffect(() => {
    getCurrentTrack();

    // playTrack();
  }, [currentTrackId]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#bdc3c7', '#000000']}
        style={styles.linearGradient}>
        <View style={styles.headerWrapper}>
          <Ionicon
            name="chevron-down-outline"
            color="#fff"
            size={35}
            onPress={_onMinimizeClick}
          />

          <Ionicon name="ellipsis-horizontal" color="#fff" size={35} />
        </View>
        <Image source={{uri: currentTrack?.artwork}} style={styles.artWork} />
        <View style={styles.trackDetailsWrapper}>
          <View style={styles.trackDetails}>
            <Text style={styles.trackName}>{currentTrack?.name}</Text>
            <Text style={styles.artistName}>{currentTrack?.artist}</Text>
          </View>

          <Icon name="heart" size={25} color="#fff" />
        </View>
        <View style={styles.trackDuration}>
          {/* <View style={styles.progressBar}>

        </View> */}
          <Slider
            style={{width: '100%', height: 40}}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#FFFFFF"
            onSlidingComplete={handleSliderChange}
          />
          <View style={styles.trackTimer}>
            <Text style={styles.timeCount}>{formatTrackTime(position)}</Text>
            <Text style={styles.totalDuration}>
              {formatTrackTime(duration)}
            </Text>
          </View>
        </View>
        <View style={styles.playerControls}>
          <Icon name="shuffle" size={25} color="white" />
          <Icon name="skip-back" size={25} color="white" />
          {playing ? (
            <Icon name="pause" size={25} color="white" onPress={onPause} />
          ) : (
            <Icon name="play-circle" size={25} color="white" onPress={onPlay} />
          )}
          <Icon name="skip-forward" size={25} color="white" />
          <Icon name="repeat" size={25} color="white" />
        </View>
        <View style={styles.optionsWrapper}>
          <Icon name="hard-drive" size={25} color="white" />
          <Icon name="menu" size={25} color="white" />
        </View>
      </LinearGradient>
      {/* <Text style={styles.trackName}> Macro Player</Text>
      <TouchableOpacity onPress={_onMinimizeClick}>
        <Text style={styles.text}>Minimize Player</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default MacroPlayer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    width: wWidth,
  },
  text: {
    color: '#fff',
  },
  linearGradient: {
    padding: 20,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  artWork: {
    width: wWidth - 40,
    height: wHeight * 0.45,
    alignSelf: 'center',
    marginTop: 20,
  },
  trackDetailsWrapper: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trackDetails: {
    marginTop: 10,
  },
  trackName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 26,
    textTransform: 'capitalize',
  },
  artistName: {
    color: 'gray',
    fontWeight: '700',
    fontSize: 18,
    textTransform: 'capitalize',
    marginTop: 7,
  },
  trackDuration: {
    width: '100%',
    marginTop: 20,
  },
  progressBar: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
  },
  trackTimer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeCount: {
    color: '#fff',
  },
  totalDuration: {
    color: '#fff',
  },
  playerControls: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  optionsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
