import React, {createContext, useState, useContext, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {TrackContext} from './TrackContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [currentTrackId, setCurrentTrackId] = useContext(TrackContext);

  const loadStorageData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@AuthData');
      if (jsonValue !== null) {
        setUser(jsonValue);
        // console.warn(jsonValue);
      }
    } catch (e) {
      console.warn(e);
    } finally {
      //loading finished
      setLoading(false);
    }
  };

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    //and call de loadStorageData function.
    loadStorageData();
  }, []);

  const storeAuthData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@AuthData', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const destroyAuthData = async () => {
    try {
      await AsyncStorage.removeItem('@AuthData');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth()
              .signInWithEmailAndPassword(email, password)
              .then(user => {
                setUser(user);
                //storeAuthData(user.uid);
                //console.log(Firebase.auth().currentUser.uid);
                storeAuthData(auth().currentUser.uid);
              });
          } catch (e) {
            console.warn(e);
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.warn(e);
          }
        },
        logout: async () => {
          try {
            await auth()
              .signOut()
              .then(
                setCurrentTrackId(null)
                  .then(() => {
                    setUser(null);
                    destroyAuthData();
                  })
                  .catch(error => {
                    console.log(error);
                  }),
              );
          } catch (e) {
            console.error(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
