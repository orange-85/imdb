import React, {useMemo} from 'react';
import {Image, StyleSheet, Text, View, ViewStyle} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../constants/Colors';
import {randomPicsUrl} from '../../utils/Utils';

type Props = {
  item: Object,
  width: number,
  height: number,
  style: ViewStyle,
};

const PersonItem = ({item, width, height, style}: Props) => {
  const renderItem = useMemo(() => (
    <View style={[styles.itemContainer, {width}, style]}>
      <Image
        source={{uri: randomPicsUrl(width, height, item.id)}}
        style={[styles.image, {height}]}
      />
      <Text numberOfLines={1} style={styles.title}>
        {item.full_name}
      </Text>
    </View>
  ));

  return renderItem;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 5,
    marginRight: 10,
    width: 120,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: Colors.imagePlaceholder,
  },
  title: {
    marginTop: 10,
    marginBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 16,
    color: Colors.titleTextColor,
  },
});

export default PersonItem;
