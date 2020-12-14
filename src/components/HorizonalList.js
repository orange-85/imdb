import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../constants/Colors';
import Screens from '../constants/Screens';
import {api} from '../helpers/ApiHelper';
import MovieItem from './MovieItem';
import {dimentions} from '../utils/Utils';
import GlobalStyles from '../../assets/styles/GlobalStyles';

type Props = {
  type: 'category' | 'movie',
  title: string,
  id?: number,
  data?: [],
};

const HorizonalList = ({type, title, id, data}: Props) => {
  const [movies, setMovies] = useState([]);
  const {navigate} = useNavigation();
  const LIMIT = 5;

  useEffect(() => {
    const getData = async () => {
      const {success, data} = await api('movie', {tags: title, limit: LIMIT});
      if (success) {
        setMovies(data.results);
      }
    };
    if (type === 'category') {
      getData();
    } else {
      setMovies(data);
    }
  }, [data]);

  const movieItemWidth = Math.round(dimentions.width / 1.3) - 30;
  const movieItemHeight = movieItemWidth / 2;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity
          style={styles.moreContainer}
          onPress={() =>
            navigate(Screens.MoviesList, {
              tags: type === 'category' ? title : null,
              offset: LIMIT,
            })
          }>
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
          <MovieItem
            item={item}
            width={type === 'category' ? 120 : movieItemWidth}
            height={type === 'category' ? 140 : movieItemHeight}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={GlobalStyles.screenPadding}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    ...GlobalStyles.screenPadding,
  },
  headerTitle: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1,
  },
  moreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  more: {
    color: Colors.mainColor,
  },
});

export default HorizonalList;
