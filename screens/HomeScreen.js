import React, {useEffect, useContext} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import RecentlyPlayed from '../components/RecentlyPlayed';
import SongItemCard from '../components/SongItemCard';
import SongList from '../components/SongList';
import TrendingList from '../components/TrendingList';
import {WidgetContext} from '../contexts/WidgetContext';
import PlayListItemCard from '../components/PlayListItemCard';
import PlayListComponent from '../components/PlayListComponent';
const HomeScreen = () => {
  const [showWidget, setShowWidget] = useContext(WidgetContext);

  useEffect(() => {
    setShowWidget(true);
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Playlists</Text>
      </View>
      <PlayListComponent />
      <View style={styles.header}>
        <Text style={styles.headerText}>Recommended For You</Text>
      </View>
      <SongList />
      <View style={styles.header}>
        <Text style={styles.headerText}>Trending Now</Text>
      </View>
      <TrendingList />
      <View>
        <Text style={styles.headerText}>Recently Played</Text>
      </View>
      <RecentlyPlayed />
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
