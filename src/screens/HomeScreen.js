import {useScrollToTop} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, View} from 'react-native';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import EmptyList from '../components/list/EmptyList';
import HorizonalList from '../components/list/HorizonalList';
import SearchBox from '../components/SearchBox';
import {api} from '../helpers/ApiHelper';
import AnimationLayout from '../utils/AnimationUtils';
import {skeletonDummyData} from '../utils/Utils';

const HomeScreen = () => {
  const dummyData = skeletonDummyData(5);
  const [categories, setCategories] = useState([]);
  const [movies, setMovies] = useState([]);
  const [artists, setArtisrs] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const ref = useRef(null);
  useScrollToTop(ref);

  const getCategories = async (params) => {
    const {success, data} = await api('category', params);
    if (success) {
      setCategories(data.results);
    }
    return success;
  };

  const getMovies = async (params) => {
    const {success, data} = await api('movie', params);
    if (success) {
      setMovies(data.results);
    }
    return success;
  };

  const getArtists = async (params) => {
    const {success, data} = await api('person', {
      ...params,
      categories: 'actor',
    });
    if (success) {
      setArtisrs(data.results);
    }
    return success;
  };

  const getDirectors = async (params) => {
    const {success, data} = await api('person', {
      ...params,
      categories: 'director',
    });
    if (success) {
      setDirectors(data.results);
    }
    return success;
  };

  const getData = async () => {
    setLoading(true);
    setError(false);
    const params = {limit: 5};
    const _categories = await getCategories(params);
    if (!categories) {
      setLoading(false);
      return setError(true);
    }
    const _movies = await getMovies(params);
    if (!_movies) {
      setLoading(false);
      return setError(true);
    }
    const _artists = await getArtists(params);
    if (!_artists) {
      setLoading(false);
      return setError(true);
    }
    const _directors = await getDirectors(params);
    if (!_directors) {
      setLoading(false);
      return setError(true);
    }
    AnimationLayout(true);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (error) {
    return (
      <View style={GlobalStyles.container}>
        <EmptyList data={[]} error={true} onPress={getData} />
      </View>
    );
  }
  
  return (
    <View style={GlobalStyles.container}>
      <SearchBox />
      <ScrollView ref={ref} showsVerticalScrollIndicator={false}>
        <HorizonalList
          type="movie"
          title={loading ? null : 'Top Movies'}
          data={loading ? dummyData : movies}
        />
        <HorizonalList
          type="person"
          personType="actor"
          title={loading ? null : 'Top 5 Artists'}
          data={loading ? dummyData : artists}
        />
        <HorizonalList
          type="person"
          personType="director"
          title={loading ? null : 'Top 5 Directors'}
          data={loading ? dummyData : directors}
        />
        {(loading ? dummyData : categories).map((category, index) => (
          <HorizonalList
            key={index}
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
