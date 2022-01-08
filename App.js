/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import {TrackContextProvider} from './contexts/TrackContext';
import {WidgetContextProvider} from './contexts/WidgetContext';
import {PlayingContextProvider} from './contexts/PlayingContext';
import PlayerScreen from './screens/PlayerScreen';
import Providers from './navigation';
import MiniPlayer from './components/MiniPlayer';
import MacroPlayer from './components/MacroPlayer';
import MusicPlayerWidget from './components/MusicPlayerWidget';
const App = () => {
  const [isMinimize, setIsMinimize] = useState(true);
  const [vare, setVare] = useState('Hello World');
  const onTest = () => {
    console.warn('...docking');
  };
  return (
    <TrackContextProvider>
      <PlayingContextProvider>
        <WidgetContextProvider>
          <Providers />
          {/* {isMinimize ? (
            <MusicPlayerWidget onTest={onTest} vare={vare} />
          ) : (
            <MacroPlayer />
          )} */}
          <PlayerScreen />
        </WidgetContextProvider>
      </PlayingContextProvider>
    </TrackContextProvider>
  );
};

export default App;
