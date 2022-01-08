import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const MacroPlayer = ({_onMinimizeClick}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.trackName}> Macro Player</Text>
      <TouchableOpacity onPress={_onMinimizeClick}>
        <Text style={styles.text}>Minimize Player</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MacroPlayer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  text: {
    color: '#fff',
  },
  linearGradient: {
    padding: 20,
  },
  headerWrapper: {},
  artWork: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginTop: 20,
  },
  trackDetailsWrapper: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trackDetails: {
    marginTop: 10,
  },
  trackName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 26,
    textTransform: 'capitalize',
  },
  artistName: {
    color: 'gray',
    fontWeight: '700',
    fontSize: 18,
    textTransform: 'capitalize',
    marginTop: 7,
  },
  trackDuration: {
    width: '100%',
    marginTop: 20,
  },
  progressBar: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
  },
  trackTimer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeCount: {
    color: '#fff',
  },
  totalDuration: {
    color: '#fff',
  },
  playerControls: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
