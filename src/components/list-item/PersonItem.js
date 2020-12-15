import React, {useMemo} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../constants/Colors';
import {randomPicsUrl} from '../../utils/Utils';
import {Placeholder, PlaceholderLine, ShineOverlay} from 'rn-placeholder';
import {useNavigation} from '@react-navigation/native';
import Screens from '../../constants/Screens';
import {PersonTypes} from './../../constants/Types';

type Props = {
  item: Object,
  width: number,
  height: number,
  style: ViewStyle,
  type: PersonTypes,
};

const PersonItem = ({item, width, height, style, type}: Props) => {
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
        disabled={type === 'actor'}
        onPress={() => navigate(Screens.MoviesList, {term: item.full_name})}
        style={[styles.itemContainer, {width}, style]}>
        <Image
          source={{uri: randomPicsUrl(width, height, item.id)}}
          style={[styles.image, {height}]}
        />
        <Text numberOfLines={1} style={styles.title}>
          {item.full_name}
        </Text>
      </TouchableOpacity>
    ),
  );

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
  titleForSkeleton: {
    height: 20,
    borderRadius: 4,
  },
});

export default PersonItem;
