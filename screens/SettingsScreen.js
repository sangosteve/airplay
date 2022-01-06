import React, {useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {AuthContext} from '../contexts/AuthProvider';

const SettingsScreen = () => {
  const {logout} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={logout}>
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  btnText: {
    color: '#fff',
  },
});
