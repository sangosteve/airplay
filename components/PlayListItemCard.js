import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import moment from 'moment';
const PlayListItemCard = ({playlist}) => {
  const playList = {
    albumTitle: 'Escape Trax',
    albumCover: require('../assets/unsplash1.jpg'),
    createDate: 'Dec 21',
  };

  return (
    <View style={styles.container}>
      <View style={styles.overLay}>
        <Text style={styles.albumTitle}>{playlist?.name}</Text>
        <Text style={styles.createDate}>{`created ${moment(
          playlist?.createDate.toDate(),
        ).format('MMM,YY')}`}</Text>
      </View>
      <Image source={{uri: playlist?.artwork}} style={styles.albumArt} />
    </View>
  );
};

export default PlayListItemCard;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 150,
    height: 150,
    margin: 10,
  },
  albumArt: {
    width: '100%',
    height: '100%',
  },
  albumTitle: {
    color: '#fff',
    fontSize: 21,
    fontWeight: '700',
  },
  createDate: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  overLay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,177,106, 0.3)',
    width: '100%',
    height: '100%',
    zIndex: 1,
    justifyContent: 'flex-end',
  },
});
