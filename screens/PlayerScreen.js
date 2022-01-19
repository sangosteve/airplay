import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import MiniPlayer from '../components/MiniPlayer';
import MacroPlayer from '../components/MacroPlayer';
import firestore from '@react-native-firebase/firestore';
import TrackPlayer, {
  State,
  useProgress,
  Capability,
} from 'react-native-track-player';
import {TrackContext} from '../contexts/TrackContext';
const {height: wHeight, width: wWidth} = Dimensions.get('window');
const dockHeight = wHeight * 0.08;
const PlayerScreen = () => {
  const [isMinimize, setIsMinimize] = useState(true);
  const [currentTrackId, setCurrentTrackId] = useContext(TrackContext);
  const [currentTrack, setCurrentTrack] = useState();
  const [loading, setLoading] = useState(true);
  const onTest = () => {
    console.warn('...docking');
  };

  const _onDock = () => {
    setIsMinimize(false);
  };
  const _onMinimizeClick = () => {
    setIsMinimize(true);
  };

  // Track Player
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

  const onTrackChange = async () => {
    const currentSong = firestore()
      .collection('songs')
      .doc(currentTrackId)
      .onSnapshot(docSnapShot => {
        // console.warn('song data', docSnapShot.data());
        // console.warn(docSnapShot.id);
        setCurrentTrackId(docSnapShot.id);
        setCurrentTrack(docSnapShot.data());
        setLoading(false);
        // console.warn(currentTrackId);
        //Play Track
        if (State.Playing || State.Paused) {
          TrackPlayer.stop();
        }
        TrackPlayer.add({
          id: docSnapShot.id,
          url: docSnapShot.data()?.file,
          title: docSnapShot.data()?.name,
          artist: docSnapShot.data()?.artist,
          artwork: docSnapShot.data()?.artwork,
        });

        TrackPlayer.play();
      });
  };

  useEffect(() => {
    onTrackChange();
  }, [currentTrackId]);
  return (
    <View
      style={[
        isMinimize ? styles.containerMini : styles.container,
        {display: currentTrackId != null ? 'flex' : 'none'},
      ]}>
      {isMinimize ? (
        <MiniPlayer
          onTest={onTest}
          _onDock={_onDock}
          dockHeight={dockHeight}
          showPlayer={currentTrackId ? true : false}
          currentTrack={currentTrack}
        />
      ) : (
        <MacroPlayer
          currentTrack={currentTrack}
          wWidth={wWidth}
          wHeight={wHeight}
          _onMinimizeClick={_onMinimizeClick}
        />
      )}
    </View>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  containerMini: {
    width: '100%',
    position: 'absolute',
    justifyContent: 'flex-end',
    backgroundColor: '#1B1B1B',
    borderWidth: 2,
    borderBottomColor: 'black',
    borderTopColor: 'transparent',
    bottom: 49,
    height: dockHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  container: {
    height: wHeight,
  },
});
