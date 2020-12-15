import React, {useMemo} from 'react';
import {Image, StyleSheet, Text, View, ViewStyle} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../constants/Colors';

type Props = {
  item: Object,
  width: number,
  height: number,
  style: ViewStyle,
};

const MovieItem = ({item, width, height, style}: Props) => {
  const renderRating = (rating) => (
    <View style={[styles.row, styles.ratingContainer]}>
      <AntDesign name="star" color={'gold'} size={17} />
      <Text style={styles.rating}>{rating}</Text>
    </View>
  );

  const renderTitleAndDirector = (item) => {
    const director = item.director;
    return (
      <>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.director}>
          {director.substring(director.indexOf(':') + 1).trim()}
        </Text>
      </>
    );
  };

  const renderItem = useMemo(() => (
    <View style={[styles.itemContainer, {width}, style]}>
      <Image
        source={{uri: `https://picsum.photos/${width}/${height}`}}
        style={[styles.image, {height}]}
      />
      <View style={styles.itemFooter}>
        {renderRating(item.rating)}
        {renderTitleAndDirector(item)}
        <Text style={{marginTop: 5}}>{item.date_of_release}</Text>
      </View>
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
  ratingContainer: {
    marginTop: 5,
    fontSize: 14,
    alignItems: 'center',
  },
  rating: {
    paddingLeft: 5,
    fontSize: 13,
  },
  itemFooter: {
    marginTop: 10,
    marginBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.titleTextColor,
  },
  director: {
    marginTop: 5,
    fontSize: 14,
    color: Colors.subTitleTextColor,
  },
});

export default MovieItem;
