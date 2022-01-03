import React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import PlayListCard from './PlayListCard';

const PlayLists = () => {
  const playlists = [
    {
      id: 1,
      name: 'Liked Songs',
      trackCount: 4,
      cover: require('../assets/unsplash1.jpg'),
    },
    {
      id: 2,
      name: 'Workout',
      trackCount: 10,
      cover: require('../assets/unsplash4.jpg'),
    },
    {
      id: 3,
      name: 'Escape Tracks',
      trackCount: 1,
      cover: require('../assets/unsplash6.jpg'),
    },
    {
      id: 4,
      name: 'road trip',
      trackCount: 1,
      cover: '',
    },
  ];
  return (
    <View>
      <FlatList
        data={playlists}
        renderItem={({item}) => (
          <PlayListCard playlist={item} keyExtractor={({item}) => item.id} />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default PlayLists;

const styles = StyleSheet.create({});
