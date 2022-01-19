import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import {TrackContext} from '../contexts/TrackContext';
import {WidgetContext} from '../contexts/WidgetContext';
import {PlayingContext} from '../contexts/PlayingContext';
import {app} from '../config/firebase';
import {getFirestore, collection, getDoc, doc} from 'firebase/firestore/lite';
import firestore from '@react-native-firebase/firestore';
const {width: wWidth, height: wHeight} = Dimensions.get('window');

const MiniPlayer = ({currentTrack, onTest, _onDock, dockHeight}) => {
  const [showWidget, setShowWidget] = useContext(WidgetContext);
  const [playing, setPlaying] = useContext(PlayingContext);
  const [isPlaying, setIsPlaying] = useState(true);
  const playbackState = usePlaybackState();
  const onPlay = () => {
    setPlaying(true);
    TrackPlayer.play();
  };
  const onPause = () => {
    setIsPlaying(false);
    TrackPlayer.pause();
  };

  const togglePlayback = async playbackState => {
    const currentTrack = await TrackPlayer.getCurrentTrack();

    if (currentTrack !== null) {
      if (playbackState === State.Paused) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  // const onPlayPausePress = async () => {
  //   const state = await TrackPlayer.getState();

  //   if (state === State.Playing) {
  //     TrackPlayer.pause();
  //     setIsPlaying(false);
  //   }

  //   if (state === State.Paused) {
  //     TrackPlayer.play();
  //     setIsPlaying(true);
  //   }
  // };

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
            </View>
          </View>
          <View style={styles.iconContainer}>
            <Icon name="heart" size={20} color="white" />
            <Pressable onPress={() => togglePlayback(playbackState)}>
              <Icon
                name={playbackState === State.Playing ? 'pause' : 'play'}
                size={20}
                color="white"
              />
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
