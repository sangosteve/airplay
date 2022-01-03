import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {app} from '../config/firebase';
import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';
import TrackPlayer from 'react-native-track-player';
// import Sound from "react-native-sound";
// Sound.setCategory("Playback");

const TestScreen = () => {
  const db = getFirestore(app);
  const [sound, setSound] = React.useState();
  const [songs, setSongs] = useState(null);
  const [playing, setPlaying] = useState();
  const getSongs = async () => {
    const songsCol = collection(db, 'songs');
    const songSnapshot = await getDocs(songsCol);
    const songList = songSnapshot.docs.map(doc => doc.data());
    setSongs(songList);
    console.warn(songs);
  };

  const start = async () => {
    // Set up the player
    await TrackPlayer.setupPlayer();

    // Add a track to the queue
    await TrackPlayer.add({
      id: 'trackId',
      url: 'https://firebasestorage.googleapis.com/v0/b/reactnativeprojects-d9358.appspot.com/o/Flvme%20-%20How%20Long(Audio).mp3?alt=media&token=bef6ac20-25b4-4a14-be9e-e7582b3c7c8c',
      title: 'Track Title',
      artist: 'Track Artist',
      // artwork: require('track.png'),
    });

    // Start playing it
    await TrackPlayer.play();
  };
  React.useEffect(() => {
    getSongs();
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => start()}>
        <Text>Play</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => TrackPlayer.stop()}>
        <Text>Stop</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#191414',
    marginTop: 20,
  },
  darkThemeText: {
    color: '#fff',
  },
  song: {
    marginTop: 50,
  },
  songName: {
    color: 'white',
    margin: 30,
  },
});
