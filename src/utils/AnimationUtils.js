import {UIManager, LayoutAnimation} from 'react-native';
import {isIos} from './Utils';
import {AnimationTypes} from './../constants/Types';

export const AnimationLayout = (
  force: boolean = false,
  type: AnimationTypes = 'easeInEaseOut',
  onAnimationDidEnd?: () => void,
) => {
  if (!isIos) {
    if (!force) {
      return;
    }
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  type === 'easeInEaseOut'
    ? LayoutAnimation.easeInEaseOut(onAnimationDidEnd)
    : LayoutAnimation.spring(onAnimationDidEnd);
};

export default AnimationLayout;
