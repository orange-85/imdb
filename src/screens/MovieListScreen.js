import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  View,
} from 'react-native';
import {api} from '../helpers/ApiHelper';
import MovieItem from '../components/MovieItem';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import {useNavigation, useRoute} from '@react-navigation/native';
import EmptyList from '../components/EmptyList';
import {dimentions} from '../utils/Utils';

const MovieListScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  const {
    params: {tags, offset},
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
          {tags ?? 'Top Movies'}
        </Text>
      ),
    });
  }, [navigation]);

  const getMovies = async () => {
    setLoading(true);
    setError(false);
    const {success, data, next} = await api(
      nextPage ?? 'movie',
      nextPage
        ? null
        : {
            tags,
            limit: 20,
            offset,
          },
    );
    if (success) {
      setMovies((m) => [...m, ...data.results]);
      setNextPage(next);
    }
    setLoading(false);
    setError(!success);
  };

  useEffect(() => {
    getMovies();
  }, []);

  const loadMore = () => {
    if (!loading && nextPage) {
      getMovies();
    }
  };

  const renderFooter = () => {
    if (nextPage) {
      return (
        <View style={{padding: 20}}>
          <ActivityIndicator size="small" color="#000" />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={GlobalStyles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item, index}) => (
          <MovieItem
            item={item}
            width={dimentions.width / 2}
            height={dimentions.width / 2}
            style={[
              {marginTop: 10, flex: 1},
              index % 2 != 0 && {marginRight: 0},
            ]}
          />
        )}
        contentContainerStyle={[
          GlobalStyles.screenPadding,
          movies.length == 0 && {flex: 1},
        ]}
        numColumns={2}
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <EmptyList
            data={movies}
            loading={loading}
            error={error}
            onPress={getMovies}
          />
        }
      />
    </View>
  );
};

export default MovieListScreen;
