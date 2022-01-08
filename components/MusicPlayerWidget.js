import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const MusicPlayerWidget = ({onTest, _onDock}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={_onDock}>
        <Text style={styles.text}>Dock Player</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MusicPlayerWidget;
const styles = StyleSheet.create({
  //   container: {
  //     width: '100%',
  //     backgroundColor: 'red',
  //     position: 'absolute',
  //     bottom: 49,
  //     height: 50,
  //     zIndex: 2,
  //   },
  text: {
    color: '#fff',
  },
});
