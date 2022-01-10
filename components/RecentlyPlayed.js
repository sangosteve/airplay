import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {app} from '../config/firebase';
import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';
import SongItemCard from './SongItemCard';

const RecentlyPlayed = () => {
  const db = getFirestore(app);
  const [songs, setSongs] = useState(null);
  const [loading, setLoading] = useState(true);
  const getSongs = async () => {
    const songsCol = collection(db, 'songs');
    const songSnapshot = await getDocs(songsCol);
    const songList = songSnapshot.docs.map(doc => doc.data());
    setSongs(songList);
    setLoading(false);
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
          <SongItemCard song={item} keyExtractor={({item}) => item.id} />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default RecentlyPlayed;
