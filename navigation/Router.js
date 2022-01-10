import React, {useState, useEffect, useContext, createRef} from 'react';
import {Text} from 'react-native';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import BottomTabNavigator from './BottomTabNavigator';
import {AuthContext} from '../contexts/AuthProvider';

export default function Router() {
  const {user, setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [inititializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (inititializing) setInitializing(false);
    setLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (loading) {
    return <Text>Loading</Text>;
  }
  return (
    <NavigationContainer theme={DarkTheme}>
      {user ? <BottomTabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}
