/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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
import PlayerWidget from './components/PlayerWidget';
import {TrackContextProvider} from './contexts/TrackContext';
import {WidgetContextProvider} from './contexts/WidgetContext';
import {PlayingContextProvider} from './contexts/PlayingContext';
const App = () => {
  return (
    <TrackContextProvider>
      <PlayingContextProvider>
        <WidgetContextProvider>
          <NavigationContainer theme={DarkTheme}>
            <BottomTabNavigator />
            {/* <PlayerWidget /> */}
          </NavigationContainer>
        </WidgetContextProvider>
      </PlayingContextProvider>
    </TrackContextProvider>
  );
};

export default App;
