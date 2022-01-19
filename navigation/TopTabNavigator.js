import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import AlbumsScreen from '../screens/AlbumsScreen';
import MyArtistsScreen from '../screens/MyArtistsScreen';
import PlaylistsScreen from '../screens/PlaylistsScreen';
const Tab = createMaterialTopTabNavigator();

export const TopTabs = () => {
  return (
 
    <Tab.Navigator>
      <Tab.Screen name="Playlists" component={PlaylistsScreen} />
      <Tab.Screen name="Albums" component={AlbumsScreen} />
      <Tab.Screen name="Artists" component={MyArtistsScreen} />
    </Tab.Navigator>
  );
  
};
