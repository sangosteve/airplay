import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import PlayingScreen from '../screens/PlayingScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Icon from 'react-native-vector-icons/Feather';

const Stack = createStackNavigator();

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({navigation}) => ({
          headerTitle: 'Explore',
          headerRight: () => (
            <Icon
              name="settings"
              size={30}
              color="#fff"
              onPress={() => navigation.navigate('Settings')}
            />
          ),
        })}
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
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: 'Settings',
        }}
      />
    </Stack.Navigator>
  );
};
