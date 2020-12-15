import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Text, View} from 'react-native';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import MovieItem from '../components/list-item/MovieItem';
import GridList from '../components/list/GridList';
import {api} from '../helpers/ApiHelper';
import {dimentions, skeletonDummyData} from '../utils/Utils';

const MovieListScreen = () => {
  const [movies, setMovies] = useState(skeletonDummyData(20));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  const {
    params: {tags, offset, term},
  } = useRoute();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text
          style={{
            fontSize: 18,
            textTransform: 'capitalize',
            color: '#000',
            fontWeight: 'bold',
          }}>
          {!!term ? term : tags ?? 'Top Movies'}
        </Text>
      ),
    });
  }, [navigation]);

  const getMovies = async () => {
    setLoading(true);
    setError(false);
    let params = null;
    if (nextPage === null) {
      params = {
        tags,
        limit: 20,
        offset,
      };
      if (!!term) {
        params = {...params, search: term};
      }
    }
    const {success, data, next} = await api(nextPage ?? 'movie', params);
    if (success) {
      setMovies((movies) =>
        nextPage ? [...movies, ...data.results] : data.results,
      );
      setNextPage(next);
    } else {
      setError(false);
      setMovies([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={GlobalStyles.container}>
      <GridList
        data={movies}
        loading={loading}
        error={error}
        hasLoadMore={nextPage !== null}
        onLoadMore={getMovies}
        renderItem={({item, index}) => (
          <MovieItem
            item={item}
            width={dimentions.width / 2 - 25}
            height={dimentions.width / 2}
            style={[
              {marginTop: 5, marginBottom: 5},
              index % 2 != 0 && {marginRight: 0},
            ]}
          />
        )}
      />
    </View>
  );
};

export default MovieListScreen;
