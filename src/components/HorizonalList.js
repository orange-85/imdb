import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../constants/Colors';
import {api} from '../helpers/ApiHelper';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = {
  type: 'category' | 'movie',
  title: string,
  id?: number,
  data?: [],
};

const HorizonalList = ({type, title, id, data}: Props) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const {success, data} = await api('movie', {tags: title, limit: 5});
      if (success) {
        setMovies(data);
      }
    };
    if (type === 'category') {
      getData();
    } else {
      setMovies(data);
    }
  }, [data]);

  const renderRating = (rating) => (
    <View style={[styles.moreContainer, styles.ratingContainer]}>
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

  const renderCategoryItem = (item) => (
    <View style={styles.itemContainer}>
      <Image
        source={{uri: 'https://picsum.photos/120/140'}}
        style={styles.image}
      />
      {renderRating(item.rating)}
      {renderTitleAndDirector(item)}
    </View>
  );

  const movieItemWidth = Math.round(Dimensions.get('window').width / 1.3) - 30;
  const movieItemHeight = movieItemWidth / 2;

  const renderMovieItem = (item) => (
    <View
      style={[
        styles.itemContainer,
        {
          width: movieItemWidth,
        },
      ]}>
      <Image
        source={{
          uri: `https://picsum.photos/${movieItemWidth}/${movieItemHeight}`,
        }}
        style={[styles.image, {height: movieItemHeight}]}
      />
      {renderRating(item.rating)}
      {renderTitleAndDirector(item)}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity style={styles.moreContainer}>
          <Text style={styles.more}>More</Text>
          <Entypo
            name="chevron-small-right"
            color={Colors.mainColor}
            size={20}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => console.log('>>>> item', item.title)}>
            {type === 'category'
              ? renderCategoryItem(item)
              : renderMovieItem(item)}
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: 30},
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerTitle: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1,
  },
  moreContainer: {flexDirection: 'row', alignItems: 'center'},
  more: {color: Colors.mainColor},
  itemContainer: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 5,
    marginRight: 10,
    width: 120,
    overflow: 'hidden',
    flex: 1,
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: Colors.imagePlaceholder,
  },
  title: {
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    color: Colors.titleTextColor,
  },
  director: {
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
    color: Colors.subTitleTextColor,
  },
  list: {paddingLeft: 20, paddingRight: 20},
  ratingContainer: {
    marginTop: 10,
    paddingLeft: 5,
    alignItems: 'center',
  },
  rating: {paddingLeft: 5, fontSize: 13},
});

export default HorizonalList;
