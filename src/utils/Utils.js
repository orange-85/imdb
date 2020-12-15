import {Dimensions, Platform} from 'react-native';

export const dimentions = Dimensions.get('window');
export const isIos = Platform.OS === 'ios';
export const randomPicsUrl = (width, height, seed) =>
  `https://picsum.photos/seed/${seed}/${parseInt(width)}/${parseInt(height)}`;
export const skeletonDummyData = (length) =>
  Array(length).fill({skeleton: true});
