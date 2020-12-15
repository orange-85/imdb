import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {api} from '../helpers/ApiHelper';
import Button from '../components/Button';
import TextBox from '../components/TextBox';
import {login} from '../redux/actions/AuthActions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DropDownHelper from '../helpers/DropDownHelper';
import {isIos} from '../utils/Utils';
import GlobalStyles from '../../assets/styles/GlobalStyles';

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
    const {success, data} = await api('user/auth-token', params, 'POST');
    setLoading(false);
    if (success) {
      dispatch(login(data.token));
    } else {
      DropDownHelper.showError('Login', 'Username or password is incorrect!');
    }
  };
  return (
    <View style={[GlobalStyles.container, GlobalStyles.screenPadding]}>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        enabled={isIos}
        behavior={isIos ? 'padding' : 'height'}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../assets/images/login.png')}
          style={styles.image}
        />
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
          transparent={false}
          title="Login"
          block
          style={styles.button}
          onPress={doLogin}
          loading={loading}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {flex: 1},
  image: {width: 160, height: 160, alignSelf: 'center'},
  button: {marginTop: 40, marginBottom: 20},
});

export default LoginScreen;
