import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const ListFooter = () => {
  return (
    <View style={{padding: 20}}>
      <ActivityIndicator size="small" color="#000" />
    </View>
  );
};

export default ListFooter;
