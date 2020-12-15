import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import Colors from '../constants/Colors';

type Props = {
  color: string,
  loading: boolean,
  onPress: void | Promise<void>,
  rounded: boolean,
  style: ViewStyle,
  textColor: string,
  textStyle: TextStyle,
  title: string,
  bordered: boolean,
  transparent: boolean,
  block: boolean,
  children: string | Node,
};

export default ({
  color = Colors.mainColor,
  loading,
  onPress,
  rounded,
  style,
  textColor,
  textStyle,
  title,
  bordered,
  transparent = true,
  block,
  children,
}: Props) => {
  let buttonColor;
  if (block) {
    buttonColor = {
      backgroundColor: loading ? Colors.disableColor : color,
    };
  } else if (bordered) {
    buttonColor = {borderColor: loading ? Colors.disableColor : color};
  }
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      disabled={loading}
      onPress={onPress}
      style={[
        styles.shared,
        block && styles.block,
        transparent && styles.transparent,
        bordered && styles.bordered,
        buttonColor,
        {borderRadius: rounded ? 25 : 5},
        style,
      ]}>
      {loading && (
        <ActivityIndicator
          color={bordered ? Colors.mainColor : '#fff'}
          style={styles.indicator}
        />
      )}
      {!!title ? (
        <Text
          numberOfLines={1}
          ellipsizeMode="middle"
          style={[
            styles.text,
            {
              color: textColor
                ? textColor
                : bordered
                ? Colors.mainColor
                : block
                ? '#fff'
                : '#222',
            },
            textStyle,
          ]}>
          {title}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shared: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    paddingRight: 5,
    paddingLeft: 5,
  },
  block: {
    backgroundColor: Colors.mainColor,
  },
  bordered: {
    borderColor: Colors.mainColor,
    borderWidth: 1,
  },
  transparent: {
    height: 40,
    width: null,
    backgroundColor: 'transparent',
  },
  text: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  indicator: {
    marginLeft: 5,
    marginRight: 5,
  },
});
