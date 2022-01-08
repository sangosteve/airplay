import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import TrackPlayer, {State} from 'react-native-track-player';
import {useRoute} from '@react-navigation/native';
import {TrackContext} from '../contexts/TrackContext';
import {WidgetContext} from '../contexts/WidgetContext';
import {PlayingContext} from '../contexts/PlayingContext';
import {app} from '../config/firebase';
import {getFirestore, collection, getDoc, doc} from 'firebase/firestore/lite';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

const PlayerWidget = ({onTest}) => {
  const [currentTrackId, setCurrentTrackId] = useContext(TrackContext);
  const [showWidget, setShowWidget] = useContext(WidgetContext);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useContext(PlayingContext);
  const [currentTrack, setCurrentTrack] = useState();

  const onPlay = () => {
    setPlaying(true);
    playTrack();
  };
  const onPause = () => {
    setPlaying(false);
    TrackPlayer.pause();
  };

  const db = getFirestore(app);
  const getCurrentTrack = async () => {
    const docRef = doc(db, 'songs', currentTrackId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCurrentTrack(docSnap.data());
      // console.warn('Document data:', docSnap.data());
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
  useEffect(() => {
    getCurrentTrack();
  }, [currentTrackId]);

  return (
    <View style={[styles.container, {display: showWidget ? 'flex' : 'none'}]}>
      <TouchableOpacity onPress={onTest}>
        <Text>Click Me</Text>
      </TouchableOpacity>

      <View style={styles.trackDetails}>
        <Image source={{uri: currentTrack?.artwork}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{currentTrack?.name}</Text>
          <Text style={styles.artist}>{currentTrack?.artist}</Text>
          {/* <Text style={styles.artist}>{currentTrackId}</Text> */}
        </View>
      </View>

      <View style={styles.iconContainer}>
        {/* <Ionicon name="heart-outline" size={30} color="white" /> */}
        <Ionicon
          name="play-skip-back-circle-outline"
          size={35}
          color="white"
          onPress={() => TrackPlayer.skipToPrevious()}
        />

        {playing ? (
          <Ionicon
            name="pause-circle-outline"
            size={35}
            color="white"
            onPress={onPause}
          />
        ) : (
          <Ionicon
            name="play-circle-outline"
            size={35}
            color="white"
            onPress={onPlay}
          />
        )}

        <Ionicon
          name="play-skip-forward-circle-outline"
          size={35}
          color="white"
          onPress={() => TrackPlayer.skipToNext()}
        />
      </View>
    </View>
  );
};

export default PlayerWidget;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#1B1B1B',
    borderWidth: 2,
    borderBottomColor: 'black',
    borderTopColor: 'transparent',
    position: 'absolute',
    bottom: 49,

    zIndex: 2,
  },
  trackDetails: {
    flexDirection: 'row',
  },
  image: {
    width: 75,
    height: 75,
  },
  textContainer: {
    marginLeft: 2,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    margin: 5,
  },
  artist: {
    color: 'lightgray',
    fontSize: 16,
    margin: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 120,
  },
});
