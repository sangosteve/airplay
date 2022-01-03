import React, {useState} from 'react';
import {StyleSheet, Text, View, Modal, Alert, Pressable} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Ionicon from 'react-native-vector-icons/Ionicons';
import PlayLists from '../components/PlayLists';
import PopUp from '../components/PopUp';
const PlaylistsScreen = () => {
  const [popupVisible, setPopUpVisible] = useState(false);

  return (
    <View style={styles.container}>
      <PopUp visible={popupVisible} setPopUpVisible={setPopUpVisible} />
      <Pressable
        style={styles.createBtn}
        onPress={() => setPopUpVisible(!popupVisible)}>
        <Ionicon name="add" color="#fff" size={30} style={styles.iconWrapper} />
        <Text style={styles.btnText}>Create Playlist</Text>
      </Pressable>
      <PlayLists />
    </View>
  );
};

export default PlaylistsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'flex-start',
  },
  iconWrapper: {
    padding: 15,
    backgroundColor: '#131313',
  },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '700',
  },
});
