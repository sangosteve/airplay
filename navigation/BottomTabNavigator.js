import React, {useContext, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
// import HomeScreen from "../../screens/HomeScreen";
import {HomeStackNavigator} from './StackNavigators';
import SearchScreen from '../screens/SearchScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LibraryScreen from '../screens/LibraryScreen';
import {TopTabs} from './TopTabNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import EIcon from 'react-native-vector-icons/Entypo';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {WidgetContext} from '../contexts/WidgetContext';
export default BottomTabNavigator = () => {
  const [showWidget, setShowWidget] = useContext(WidgetContext);
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: () => (
            <Icon
              name="home"
              size={28}
              color="#fff"
              onPress={setShowWidget(true)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={RegisterScreen}
        options={{
          tabBarIcon: () => <Icon name="search" size={28} color="#fff" />,
        }}
      />
      <Tab.Screen
        name="Library"
        component={TopTabs}
        options={{
          tabBarIcon: () => (
            <MIcon name="music-box-multiple" size={28} color="#fff" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
