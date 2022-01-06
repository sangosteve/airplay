import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Pressable,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../contexts/AuthProvider';
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.logoText}> Airplay</Text>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.inputField}
          placeholder="Username or Email"
          value={email}
          onChangeText={email => setEmail(email)}
        />
        <TextInput
          placeholder="Password"
          style={styles.inputField}
          value={password}
          onChangeText={password => setPassword(password)}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => login(email, password)}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <View>
          <Text>Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text>Sign Up</Text>
          </Pressable>
        </View>
      </View>
      <Text style={styles.mutedText}>or continue with</Text>
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
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  inputWrapper: {
    width: '100%',
  },
  inputField: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginTop: 25,
    fontWeight: '900',
    fontSize: 18,
  },
  btn: {
    padding: 15,
    marginTop: 45,
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
    marginTop: 45,
    color: 'grey',
    fontSize: 22,
    alignSelf: 'center',
  },
  socialWrapper: {
    flexDirection: 'row',
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialBtn: {
    width: 40,
    height: 40,
    backgroundColor: 'gray',
    marginLeft: 15,
  },
  socialBtnImage: {
    width: '100%',
    height: '100%',
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
