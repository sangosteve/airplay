import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import SongList from '../components/SongList';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Recommended For You</Text>
      </View>
      <SongList />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  header: {
    padding: 15,
  },
  headerText: {
    color: 'white',
    fontSize: 21,
    fontWeight: 'bold',
  },
});
