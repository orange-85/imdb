import {useNavigation, useScrollToTop} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Modal, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import Button from '../components/Button';
import EmptyList from '../components/list/EmptyList';
import HorizonalList from '../components/list/HorizonalList';
import SearchBox from '../components/SearchBox';
import Colors from '../constants/Colors';
import {api} from '../helpers/ApiHelper';
import AnimationLayout from '../utils/AnimationUtils';
import {dimentions, skeletonDummyData} from '../utils/Utils';
import {logout} from '../redux/actions/AuthActions';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const dummyData = skeletonDummyData(5);
  const [categories, setCategories] = useState([]);
  const [movies, setMovies] = useState([]);
  const [artists, setArtisrs] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const ref = useRef(null);
  useScrollToTop(ref);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          style={{
            paddingRight: 15,
            paddingLeft: 15,
            height: '100%',
            justifyContent: 'center',
          }}
          onPress={() => setLogoutModalVisible(true)}>
          <Ionicons name="exit-outline" color={Colors.mainColor} size={25} />
        </Button>
      ),
    });
  }, [navigation]);

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

  const renderLogoutModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer} onClose={() => null}>
            <Ionicons
              name="ios-information-circle"
              size={65}
              color={Colors.mainColor}
            />
            <Text style={styles.modalQuestion}>Do you want to log out?</Text>
            <Button
              title="Logout"
              transparent={false}
              block
              style={styles.logoutButton}
              onPress={() => dispatch(logout())}
            />
            <Button
              title="Cancel"
              transparent
              style={styles.cancelButton}
              textStyle={{fontWeight: '300'}}
              onPress={() => setLogoutModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={GlobalStyles.container}>
      {error ? (
        <EmptyList data={[]} error={true} onPress={getData} />
      ) : (
        <>
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
        </>
      )}
      {renderLogoutModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    backgroundColor: '#000000cc',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    padding: 10,
    width: dimentions.width / 1.5,
    height: null,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.borderColor,
    borderWidth: 1,
  },
  modalQuestion: {
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center',
    color: Colors.titleTextColor,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 30,
  },
  cancelButton: {
    marginTop: 8,
    width: '100%',
  },
});

export default HomeScreen;
