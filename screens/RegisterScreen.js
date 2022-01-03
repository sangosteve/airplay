import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.logoText}> Airplay</Text>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput style={styles.inputField} placeholder="Full Name " />
        <TextInput style={styles.inputField} placeholder="Username or Email" />
        <TextInput placeholder="Password" style={styles.inputField} />
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Signup</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.mutedText, {alignSelf: 'flex-end'}]}>
        Forgot password?
      </Text>

      <Text style={[styles.mutedText, {color: '#27ae60', fontWeight: '700'}]}>
        Signup with
      </Text>
      <View style={styles.socialWrapper}>
        <TouchableOpacity style={styles.socialBtn}>
          <Image
            source={{
              uri: 'https://image.similarpng.com/very-thumbnail/2020/06/Logo-google-icon-PNG.png',
            }}
            style={styles.socialBtnImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn}>
          <Image
            source={{
              uri: 'https://image.similarpng.com/very-thumbnail/2020/04/Popular-facebook-Logo-png.png',
            }}
            style={styles.socialBtnImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn}>
          <Image
            source={{
              uri: 'https://image.similarpng.com/very-thumbnail/2020/06/Logo-Twitter-icon-transparent-PNG.png',
            }}
            style={styles.socialBtnImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  inputField: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginTop: 15,
    fontWeight: '900',
    fontSize: 18,
  },
  btn: {
    padding: 15,
    marginTop: 25,
    borderRadius: 35,
    alignItems: 'center',
    backgroundColor: '#27ae60',
  },
  btnText: {
    fontSize: 26,
    fontWeight: '900',
    color: '#fff',
  },

  mutedText: {
    marginTop: 25,
    color: 'grey',
    fontSize: 22,
    alignSelf: 'center',
    fontWeight: '900',
  },
  socialWrapper: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialBtn: {
    width: 30,
    height: 30,
    backgroundColor: 'gray',
    marginLeft: 15,
  },
  socialBtnImage: {
    width: '100%',
    height: '100%',
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
