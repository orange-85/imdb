import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {AppNavigator} from './src/navigation/AppNavigator';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store';
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
    </>
  );
};

export default App;
