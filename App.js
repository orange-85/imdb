import React from 'react';
import {StatusBar} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import DropDownHelper from './src/helpers/DropDownHelper';
import {AppNavigator} from './src/navigation/AppNavigator';
import {persistor, store} from './src/redux/store';
import SplashScreen from './src/screens/SplashScreen';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Provider store={store}>
        <PersistGate loading={<SplashScreen />} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
      <DropdownAlert
        ref={(ref) => DropDownHelper.setDropDown(ref)}
        updateStatusBar
        useNativeDriver
        messageNumOfLines={0}
        titleNumOfLines={0}
        messageStyle={{marginTop: 5, color: '#fff'}}
      />
    </>
  );
};

export default App;
