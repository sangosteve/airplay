import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

const PlayListCard = ({playlist}) => {
  return (
    <View style={styles.container}>
      {playlist.cover ? (
        <Image style={styles.image} source={playlist.cover} />
      ) : (
        <Ionicon
          name="musical-notes"
          color="#fff"
          size={32}
          style={{padding: 17, backgroundColor: '#131313'}}
        />
      )}

      <View style={styles.textWrapper}>
        <Text style={styles.playListName}>{playlist.name}</Text>
        <Text style={styles.trackCount}>{`${playlist.trackCount} songs`}</Text>
      </View>
    </View>
  );
};

export default PlayListCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 65,
    height: 65,
    resizeMode: 'cover',
  },
  textWrapper: {
    marginLeft: 10,
  },
  playListName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  trackCount: {
    color: 'gray',
    textTransform: 'capitalize',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
