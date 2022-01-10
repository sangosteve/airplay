import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import TrackPlayer, {State} from 'react-native-track-player';
import {TrackContext} from '../contexts/TrackContext';
import {WidgetContext} from '../contexts/WidgetContext';
import {PlayingContext} from '../contexts/PlayingContext';
import {app} from '../config/firebase';
import {getFirestore, collection, getDoc, doc} from 'firebase/firestore/lite';
const {width: wWidth, height: wHeight} = Dimensions.get('window');
const MiniPlayer = ({onTest, _onDock, dockHeight}) => {
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
    <View
      style={{
        width: wWidth,
        height: dockHeight,
      }}>
      <TouchableWithoutFeedback onPress={_onDock}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={styles.trackDetails}>
            <Image
              source={{uri: currentTrack?.artwork}}
              style={{width: 70, height: dockHeight}}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{currentTrack?.name}</Text>
              <Text style={styles.artist}>{currentTrack?.artist}</Text>
              {/* <Text style={styles.artist}>{currentTrackId}</Text> */}
            </View>
          </View>
          <View style={styles.iconContainer}>
            {/* <Ionicon name="heart-outline" size={30} color="white" /> */}
            <Icon name="heart" size={20} color="white" />

            {playing ? (
              <Icon name="pause" size={20} color="white" onPress={onPause} />
            ) : (
              <Icon name="play" size={20} color="white" onPress={onPlay} />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
      {/* <TouchableOpacity
        onPress={_onDock}
        style={{
          backgroundColor: 'green',
          height: '100%',
          width: '100%',
        }}>
        <Text style={styles.text}>DOCK</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default MiniPlayer;

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 50,
    marginRight: 15,
  },
  trackDetails: {
    flexDirection: 'row',
  },
  textContainer: {
    marginLeft: 5,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    textTransform: 'capitalize',
    marginTop: 3,
  },
  artist: {
    color: 'lightgray',
    fontSize: 16,
    marginBottom: 3,
  },
});
