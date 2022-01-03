import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const PopUp = ({visible, setPopUpVisible}) => {
  return (
    <View style={[styles.container, {display: visible ? 'flex' : 'none'}]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Give your playlist a name</Text>
      </View>
      <TextInput style={styles.inputField}></TextInput>
      <View style={styles.footer}>
        <Pressable onPress={() => setPopUpVisible(!visible)}>
          <Text style={styles.actionText}>Cancel</Text>
        </Pressable>
        <Pressable onPress={() => console.warn('create')}>
          <Text style={styles.actionText}>Create</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PopUp;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: 200,
    backgroundColor: 'gray',
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 2,
    top: 50,
    borderRadius: 8,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  inputField: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 15,
  },
  footer: {
    display: 'flex',
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionText: {
    color: 'blue',
    fontSize: 18,
    fontWeight: '900',
  },
});
