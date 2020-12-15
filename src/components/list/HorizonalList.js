import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import GlobalStyles from '../../../assets/styles/GlobalStyles';
import Colors from '../../constants/Colors';
import Screens from '../../constants/Screens';
import {api} from '../../helpers/ApiHelper';
import {dimentions} from '../../utils/Utils';
import Button from '../Button';
import MovieItem from '../list-item/MovieItem';
import PersonItem from '../list-item/PersonItem';

type Props = {
  type: 'category' | 'movie' | 'person',
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
        {type !== 'person' && (
          <Button
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
          </Button>
        )}
      </View>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) =>
          type === 'person' ? (
            <PersonItem item={item} width={120} height={140} />
          ) : (
            <MovieItem
              item={item}
              width={type === 'category' ? 120 : movieItemWidth}
              height={type === 'category' ? 140 : movieItemHeight}
            />
          )
        }
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
    alignItems: 'center',
    ...GlobalStyles.screenPadding,
  },
  headerTitle: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 17,
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
