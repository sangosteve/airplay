import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import SearchGenreCard from './SearchGenreCard';
const AllGenresList = () => {
  const allGenres = [
    {id: 1, name: 'HiHop'},
    {id: 2, name: 'RnB'},
    {id: 3, name: 'Electro'},
    {id: 4, name: 'Rock'},
    {id: 5, name: 'Gospel'},
    {id: 6, name: 'Concerts'},
    {id: 7, name: 'New Releases'},
    {id: 8, name: 'Podcasts'},
    {id: 9, name: 'Charts'},
    {id: 10, name: 'Dance Electronic'},
  ];
  const bgColors = [
    {id: 1, name: '#1abc9c'},
    {id: 2, name: '#9b59b6'},
    {id: 3, name: '#e74c3c'},
    {id: 4, name: '#7f8fa6'},
    {id: 5, name: '#273c75'},
    {id: 6, name: '#D980FA'},
    {id: 7, name: '#1289A7'},
    {id: 8, name: '#6F1E51'},
    {id: 9, name: '#596275'},
    {id: 10, name: '#f5cd79'},
  ];
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={allGenres}
        renderItem={({item}) => (
          <SearchGenreCard
            genre={item}
            keyExtractor={({item}) => item.id}
            genreId={item.id}
            bgColors={bgColors}
          />
        )}
        horizontal={false}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AllGenresList;

const styles = StyleSheet.create({});
