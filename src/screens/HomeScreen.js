import {useNavigation, useScrollToTop} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {InteractionManager, ScrollView, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import Button from '../components/Button';
import EmptyList from '../components/list/EmptyList';
import HorizonalList from '../components/list/HorizonalList';
import TextBox from '../components/TextBox';
import Colors from '../constants/Colors';
import Screens from '../constants/Screens';
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
  const [term, setTerm] = useState('');

  const {navigate} = useNavigation();

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

  const search = () => {
    if (term.trim().length === 0) {
      return;
    }
    navigate(Screens.SearchResult, {term});
  };

  return (
    <View style={GlobalStyles.container}>
      <TextBox
        placeholder="Search"
        returnKeyType="search"
        style={[GlobalStyles.screenPadding, {paddingTop: 5, paddingBottom: 5}]}
        value={term}
        onChangeText={(text) => setTerm(text)}
        onSubmitEditing={search}
        button={
          <Button
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              height: '100%',
              justifyContent: 'center',
            }}
            onPress={search}>
            <Feather name="search" size={20} color={Colors.mainColor} />
          </Button>
        }
      />
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
