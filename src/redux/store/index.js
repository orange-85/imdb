import AsyncStorage from '@react-native-community/async-storage';
import {applyMiddleware, compose, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import AuthReducer from '../reducers/AuthReducer';

const middleware = [];

if (__DEV__) {
  middleware.push(createLogger());
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, AuthReducer);
export const store = createStore(
  persistedReducer,
  {},
  compose(applyMiddleware(...middleware)),
);
export const persistor = persistStore(store);
