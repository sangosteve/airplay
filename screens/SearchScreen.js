import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#e3e9ee', '#a7a8ad', '#6e6d6f', '#383737', '#000000']}
        style={styles.linearGradient}></LinearGradient>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    width: '100%',
    height: '100%',
  },
});
