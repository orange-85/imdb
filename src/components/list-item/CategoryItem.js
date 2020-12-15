import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Colors from '../../constants/Colors';
import Screens from '../../constants/Screens';
import {randomPicsUrl} from '../../utils/Utils';
import {Placeholder, PlaceholderLine, ShineOverlay} from 'rn-placeholder';

type Props = {
  item: Object,
  width: number,
  height: number,
  style: ViewStyle,
};

const CategoryItem = ({item, width, height, style}: Props) => {
  const {navigate} = useNavigation();

  const renderItem = useMemo(() =>
    item.skeleton ? (
      <View style={[styles.itemContainer, {width}, style]}>
        <Placeholder Animation={ShineOverlay}>
          <PlaceholderLine style={[styles.image, {height}]} noMargin />
          <View style={[styles.title]}>
            <PlaceholderLine
              style={[styles.titleForSkeleton, {width: width / 2}]}
              noMargin
            />
          </View>
        </Placeholder>
      </View>
    ) : (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.itemContainer, {width}, style]}
        onPress={() =>
          navigate(Screens.MoviesList, {
            tags: item.name,
            offset: 0,
          })
        }>
        <Image
          source={{uri: randomPicsUrl(width, height, item.id)}}
          style={[styles.image, {height}]}
        />
        <Text style={styles.title}>{item.name}</Text>
      </TouchableOpacity>
    ),
  );

  return renderItem;
};

const styles = StyleSheet.create({
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
    textTransform: 'capitalize',
  },
  titleForSkeleton: {
    height: 20,
    borderRadius: 4,
  },
});

export default CategoryItem;
