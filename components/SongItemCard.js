import React, {useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import TrackPlayer, {State} from 'react-native-track-player';
import {TrackContext} from '../contexts/TrackContext';
const SongItemCard = ({song, songId}) => {
  const [currentTrackId, setCurrentTrackId] = useContext(TrackContext);

  const onItemPress = async trackId => {
    await TrackPlayer.stop();
    await TrackPlayer.reset();
    setCurrentTrackId(trackId);
    await TrackPlayer.add({
      url: song.file,
      title: song.name,
      artist: song.artist,
      artwork: song.artwork,
    });
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
  return (
    <TouchableWithoutFeedback onPress={() => onItemPress(song.trackId)}>
      <View style={styles.container}>
        <Image source={{uri: song.artwork}} style={styles.image} />
        <View style={styles.songDetailsText}>
          <Text style={styles.songName}>{song.name}</Text>
          <Text style={styles.artistName}>{song.artist}</Text>
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
