import React from 'react';
import {ActivityIndicator, View, ViewStyle, Text} from 'react-native';
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
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
      }}>
      {!loading && data.length === 0 ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {emptyDataIcon ? (
            emptyDataIcon
          ) : (
            <Ionicons
              name="ios-information-circle"
              style={{
                color: error ? 'red' : Colors.mainColor,
                fontSize: 45,
                marginBottom: 10,
              }}
            />
          )}
          <Text style={{textAlign: 'center', fontSize: 16, lineHeight: 23}}>
            {!!emptyTitle ? emptyTitle : error ? 'An error has occurred' : 'There is no data'}
          </Text>
          {onPress != null && (
            <Button
              title={error ? 'Retry' : !!buttonTitle ? buttonTitle : 'Refresh'}
              onPress={onPress}
              underlayColor="transparent"
              transparent
              style={{marginTop: 5}}
              titleStyle={{fontSize: 13}}
            />
          )}
        </View>
      ) : (
        !refreshing && <ActivityIndicator size="large" color="#000" />
      )}
    </View>
  );
};
