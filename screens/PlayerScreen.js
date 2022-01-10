import React, {useState, useContext} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import MiniPlayer from '../components/MiniPlayer';
import MacroPlayer from '../components/MacroPlayer';
import {getFirestore, collection, getDoc, doc} from 'firebase/firestore/lite';
import {TrackContext} from '../contexts/TrackContext';
const {height: wHeight, width: wWidth} = Dimensions.get('window');
const dockHeight = wHeight * 0.08;
const PlayerScreen = () => {
  const [isMinimize, setIsMinimize] = useState(true);
  const [currentTrackId, setCurrentTrackId] = useContext(TrackContext);
  const onTest = () => {
    console.warn('...docking');
  };

  const _onDock = () => {
    setIsMinimize(false);
  };
  const _onMinimizeClick = () => {
    setIsMinimize(true);
  };
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
        />
      ) : (
        <MacroPlayer
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
