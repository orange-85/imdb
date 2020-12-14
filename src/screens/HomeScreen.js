import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import EmptyList from '../components/EmptyList';
import HorizonalList from '../components/HorizonalList';
import {api} from '../helpers/ApiHelper';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import {useScrollToTop} from '@react-navigation/native';

const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef(null);
  useScrollToTop(ref);

  const getData = async () => {
    setLoading(true);
    setError(false);
    const params = {limit: 5};
    const _categories = await api('category', params);
    if (_categories.success) {
      setCategories(_categories.data.results);
      const _movies = await api('movie', params);
      if (_movies.success) {
        setMovies(_movies.data.results);
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={GlobalStyles.container}>
      {loading || error ? (
        <EmptyList
          data={movies}
          loading={loading}
          error={error}
          onPress={getData}
        />
      ) : (
        <ScrollView ref={ref} showsVerticalScrollIndicator={false}>
          <HorizonalList type="movie" title="Top Movies" data={movies} />
          {categories.map((category) => (
            <HorizonalList
              key={category.id}
              type="category"
              title={category.name}
              id={category.id}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
