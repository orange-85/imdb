import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import EmptyList from '../components/EmptyList';
import HorizonalList from '../components/HorizonalList';
import {api} from '../helpers/ApiHelper';

const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getData = async () => {
    setLoading(true);
    setError(false);
    const params = {limit: 5};
    const _categories = await api('category', params);
    if (_categories.success) {
      setCategories(_categories.data);
      const _movies = await api('movie', params);
      if (_movies.success) {
        console.log('>>>> _movies.data: ', _movies.data);
        setMovies(_movies.data);
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

  if (loading || error) {
    return (
      <EmptyList
        data={movies}
        loading={loading}
        error={error}
        onPress={getData}
      />
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
    </View>
  );
};

export default HomeScreen;
