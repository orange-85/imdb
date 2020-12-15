import React from 'react';
import {
  ActivityIndicator,
  View,
  ViewStyle,
  Text,
  StyleSheet,
} from 'react-native';
import Button from '../Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

type Props = {
  error: boolean,
  loading: boolean,
  refreshing: boolean,
  data: Array,
  onPress?: void,
  emptyDataIcon: string,
  emptyTitle?: string,
  buttonTitle?: string,
  style: ViewStyle,
};

export default ({
  error,
  loading,
  data,
  onPress,
  refreshing,
  emptyDataIcon,
  emptyTitle,
  buttonTitle,
  style,
}: Props) => {
  return (
    <View style={styles.container}>
      {!loading && data.length === 0 ? (
        <View style={styles.contentContainer}>
          {emptyDataIcon ? (
            emptyDataIcon
          ) : (
            <Ionicons
              name="ios-information-circle"
              style={[styles.icon, {color: error ? 'red' : Colors.mainColor}]}
            />
          )}
          <Text style={styles.title}>
            {!!emptyTitle
              ? emptyTitle
              : error
              ? 'An error has occurred'
              : 'There is no data'}
          </Text>
          {onPress != null && (
            <Button
              title={error ? 'Retry' : !!buttonTitle ? buttonTitle : 'Refresh'}
              onPress={onPress}
              underlayColor="transparent"
              style={{marginTop: 5}}
              titleStyle={{fontSize: 13}}
              textStyle={{color: Colors.mainColor}}
            />
          )}
        </View>
      ) : (
        !refreshing && <ActivityIndicator size="large" color="#000" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 45,
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 23,
  },
});
