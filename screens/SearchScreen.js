import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import TopGenreSearchList from '../components/TopGenreSearchList';
import AllGenresList from '../components/AllGenresList';
const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>Search</Text>
      </View>
      <View style={styles.searchInputWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder="Artists,songs or podcasts"
        />
        <Icon name="search" size={20} style={styles.searchIcon} />
      </View>

      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>Your Top Genres</Text>
      </View>
      <TopGenreSearchList />

      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>Browse All</Text>
      </View>

      <AllGenresList />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  headerWrapper: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },
  searchInputWrapper: {
    position: 'relative',
    marginTop: 20,
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingLeft: 45,
    fontWeight: '700',
    fontSize: 16,
  },
  searchIcon: {
    position: 'absolute',
    top: 16,
    left: 15,
    color: '#000',
  },
});
