import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import Slider from '@react-native-community/slider';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {TrackContext} from '../contexts/TrackContext';
import TrackPlayer, {useProgress, Capability} from 'react-native-track-player';
import {PlayingContext} from '../contexts/PlayingContext';
import {app} from '../config/firebase';
import {getFirestore, collection, getDoc, doc} from 'firebase/firestore/lite';
import {TouchableOpacity} from 'react-native-gesture-handler';
const PlayingScreen = () => {
  const [currentTrackId, setCurrentTrackId] = useContext(TrackContext);
  const imageUrl = 'http://donapr.com/wp-content/uploads/2016/03/RRUe0Mo.png';
  const [imgColors, setImgColors] = useState([]);
  const [playing, setPlaying] = useContext(PlayingContext);
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
      <Image source={{uri: currentTrack?.artwork}} style={styles.artWork} />
      <View style={styles.trackDetails}>
        <View style={styles.trackDetails}>
          <Text style={styles.trackName}>{currentTrack?.name}</Text>
          <Text style={styles.artistName}>{currentTrack?.artist}</Text>
        </View>
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
          <Text style={styles.totalDuration}>{formatTrackTime(duration)}</Text>
        </View>
      </View>

      <View style={styles.playerControls}>
        <Ionicon name="shuffle-outline" size={38} color="white" />
        <Ionicon name="play-skip-back-circle-outline" size={38} color="white" />
        {playing ? (
          <Ionicon
            name="pause-circle-outline"
            size={38}
            color="white"
            onPress={onPause}
          />
        ) : (
          <Ionicon
            name="play-circle-outline"
            size={38}
            color="white"
            onPress={onPlay}
          />
        )}
        <Ionicon
          name="play-skip-forward-circle-outline"
          size={38}
          color="white"
        />
        <Ionicon name="repeat" size={38} color="white" />
      </View>
    </View>
  );
};

export default PlayingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
    padding: 15,
  },
  artWork: {
    width: '100%',
    height: 300,
  },
  trackDetails: {
    width: '100%',
    marginTop: 15,
  },
  trackName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'capitalize',
  },
  artistName: {
    color: 'gray',
    fontWeight: '400',
    fontSize: 16,
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
    marginTop: 30,
  },
});
