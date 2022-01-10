import React, {createContext, useState, useContext} from 'react';
import auth from '@react-native-firebase/auth';
import {TrackContext} from './TrackContext';
export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState({
    name: 'steve',
  });
  const [currentTrackId, setCurrentTrackId] = useContext(TrackContext);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
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
            await auth().signOut().then(setCurrentTrackId(null));
          } catch (e) {
            console.error(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
