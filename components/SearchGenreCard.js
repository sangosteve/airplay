import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SearchGenreCard = props => {
  return (
    <View
      style={{
        width: 180,
        height: 80,
        backgroundColor: props.bgColors[props.genre?.id]?.name,
        margin: 10,
        borderRadius: 4,
      }}>
      <Text
        style={{color: '#fff', fontSize: 20, fontWeight: '700', margin: 10}}>
        {props.genre?.name}
      </Text>
    </View>
  );
};

export default SearchGenreCard;

const styles = StyleSheet.create({
  width: 300,
  height: 250,
});
