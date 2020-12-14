import {Dimensions, Platform} from 'react-native';

export const dimentions = Dimensions.get('window');
export const isIos = Platform.OS === 'ios';
