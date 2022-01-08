import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Ionicon from 'react-native-vector-icons/Ionicons';
const {width: wWidth, height: wHeight} = Dimensions.get('window');
const MiniPlayer = props => {
  return (
    <View>
      <TouchableOpacity
        onPress={props.onTest}
        style={{
          backgroundColor: 'green',
          height: '100%',
          width: '100%',
        }}>
        <Text style={styles.text}>DOCK</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MiniPlayer;

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 50,
  },
});
