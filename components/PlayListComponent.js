import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {app} from '../config/firebase';
import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';
import PlayListItemCard from './PlayListItemCard';
const PlayListComponent = () => {
  const db = getFirestore(app);
  const [playlists, setPlaylists] = useState(null);
  const [loading, setLoading] = useState(true);
  const getPlayLists = async () => {
    const songsCol = collection(db, 'playlists');
    const songSnapshot = await getDocs(songsCol);
    const songList = songSnapshot.docs.map(doc => doc.data());
    setPlaylists(songList);
    setLoading(false);
  };

  useEffect(() => {
    getPlayLists();
  }, []);
  if (loading) {
    return <Text>Loading</Text>;
  }
  return (
    <View>
      <FlatList
        data={playlists}
        renderItem={({item}) => (
          <PlayListItemCard
            playlist={item}
            keyExtractor={({item}) => item.id}
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default PlayListComponent;
