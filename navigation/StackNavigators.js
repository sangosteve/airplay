import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import PlayingScreen from '../screens/PlayingScreen';
import Icon from 'react-native-vector-icons/Feather';

const Stack = createStackNavigator();

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: 'Explore',
          tabBarIcon: () => <Icon name="home" size={28} color="#000" />,
        }}
      />
      <Stack.Screen
        name="PlayingScreen"
        component={PlayingScreen}
        options={{
          headerTitle: 'Now Playing',
          headerLeft: () => <Icon name="chevron-down" size={28} color="#fff" />,
          tabBarIcon: () => <Icon name="home" size={28} color="#000" />,
        }}
      />
    </Stack.Navigator>
  );
};
