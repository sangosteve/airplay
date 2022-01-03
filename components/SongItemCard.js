import React, {useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';
import {TrackContext} from '../contexts/TrackContext';
import {WidgetContext} from '../contexts/WidgetContext';
const SongItemCard = ({song, songId}) => {
  const navigation = useNavigation();
  const [currentTrackId, setCurrentTrackId] = useContext(TrackContext);
  const [showWidget, setShowWidget] = useContext(WidgetContext);
  const onItemPress = async trackId => {
    setCurrentTrackId(trackId);
    setShowWidget(false);
    navigation.navigate('PlayingScreen');
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
    // navigation.navigate('PlayingScreen');
  };

  useEffect(() => {
    setShowWidget(true);
  }, []);
  return (
    <TouchableWithoutFeedback onPress={() => onItemPress(song.trackId)}>
      <View style={styles.container}>
        <Image source={{uri: song.artwork}} style={styles.image} />
        <View style={styles.songDetailsText}>
          <Text style={styles.songName}>{song.name}</Text>
          <Text style={styles.artistName}>{song.artist}</Text>
          {/* <Text style={styles.artistName}>{songId}</Text> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SongItemCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  songDetailsText: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  songName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'capitalize',
  },
  artistName: {
    color: '#cecece',
    fontSize: 16,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
});
