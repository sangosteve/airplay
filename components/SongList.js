import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {app} from '../config/firebase';
import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';
import SongItemCard from './SongItemCard';

const SongList = () => {
  const db = getFirestore(app);
  const [songs, setSongs] = useState(null);
  const [loading, setLoading] = useState(true);
  const getSongs = async () => {
    const songsCol = collection(db, 'songs');
    const songSnapshot = await getDocs(songsCol);
    const songList = songSnapshot.docs.map(doc => ({
      trackId: doc.id,
      ...doc.data(),
    }));
    setSongs(songList);
    setLoading(false);
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

  if (loading) {
    return <Text>Loading</Text>;
  }
  return (
    <View>
      <FlatList
        data={songs}
        renderItem={({item}) => (
          <SongItemCard
            song={item}
            keyExtractor={({item}) => item.id}
            songId={item.trackId}
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default SongList;
