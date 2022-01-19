/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {TrackContextProvider} from './contexts/TrackContext';
import {WidgetContextProvider} from './contexts/WidgetContext';
import {PlayingContextProvider} from './contexts/PlayingContext';
import PlayerScreen from './screens/PlayerScreen';
import Providers from './navigation';
const App = () => {
  return (
    <TrackContextProvider>
      <PlayingContextProvider>
        <WidgetContextProvider>
          <Providers />
          {/* <PlayerScreen /> */}
        </WidgetContextProvider>
      </PlayingContextProvider>
    </TrackContextProvider>
  );
};

export default App;
