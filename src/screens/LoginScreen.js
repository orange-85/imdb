import React from 'react';
import {useState} from 'react';
import {View} from 'react-native';
import Button from '../components/Button';
import TextBox from '../components/TextBox';
import {api} from '../api/ApiHelper';
import EndPoints from '../constants/EndPoints';
import AsyncStorage from '@react-native-community/async-storage';
import StorageFields from '../constants/StorageFields';
import Screens from '../constants/Screens';
import {useDispatch} from 'react-redux';
import {login} from '../redux/actions/AuthActions';

const LoginScreen = () => {
  const [username, setUsername] = useState(__DEV__ ? 'hriks' : '');
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState(__DEV__ ? 'gt4043@1' : '');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const doLogin = async () => {
    if (username.trim().length === 0) {
      return setUsernameError('Username is required');
    }
    if (password.trim().length === 0) {
      return setPasswordError('Password is required');
    }
    setLoading(true);
    const params = {username, password};
    const {success, data} = await api(EndPoints.login, params, 'POST');
    setLoading(false);
    if (success) {
      // await AsyncStorage.setItem(StorageFields.userToken, data.token);
      dispatch(login(data.token));
    } else {
      alert('Username or password is incorrect!');
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
      <TextBox
        required
        error={!!usernameError}
        errorMessage={usernameError}
        label="User name"
        placeholder="Please enter user name"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          setUsernameError('');
        }}
      />
      <TextBox
        required
        error={!!passwordError}
        errorMessage={passwordError}
        label="Password"
        placeholder="Please enter password"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setPasswordError('');
        }}
      />
      <Button
        title="Login"
        block
        style={{marginTop: 40}}
        onPress={doLogin}
        loading={loading}
      />
    </View>
  );
};

export default LoginScreen;
