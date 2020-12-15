import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import GlobalStyles from '../../../assets/styles/GlobalStyles';
import Colors from '../../constants/Colors';
import Screens from '../../constants/Screens';
import {api} from '../../helpers/ApiHelper';
import {dimentions, skeletonDummyData} from '../../utils/Utils';
import MovieItem from '../list-item/MovieItem';
import PersonItem from '../list-item/PersonItem';
import {Placeholder, PlaceholderLine, Fade, ShineOverlay} from 'rn-placeholder';
import {ListTypes, PersonTypes} from './../../constants/Types';

type Props = {
  type: ListTypes,
  personType?: PersonTypes,
  title: string,
  id?: number,
  data?: [],
};

const HorizonalList = ({type, personType, title, id, data}: Props) => {
  const LIMIT = 5;
  const [movies, setMovies] = useState(skeletonDummyData(LIMIT));
  const {navigate} = useNavigation();

  useEffect(() => {
    const getData = async () => {
      const {success, data} = await api('movie', {tags: title, limit: LIMIT});
      if (success) {
        setMovies(data.results);
      } else {
        setMovies([]);
      }
    };
    if (type === 'category') {
      if (id) {
        getData();
      } else {
        setMovies(skeletonDummyData(LIMIT));
      }
    } else {
      setMovies(data);
    }
  }, [data, id]);

  const movieItemWidth = Math.round(dimentions.width / 1.3) - 30;
  const movieItemHeight = movieItemWidth / 2;

  const renderListHeader = () => {
    if (title == null) {
      return (
        <View style={styles.headerContainer}>
          <View style={{flex: 1}}>
            <Placeholder Animation={ShineOverlay}>
              <PlaceholderLine style={styles.titleForSkeleton} noMargin />
            </Placeholder>
          </View>
          {type !== 'person' && (
            <Placeholder Animation={ShineOverlay}>
              <PlaceholderLine
                style={[styles.titleForSkeleton, {width: 50}]}
                noMargin
              />
            </Placeholder>
          )}
        </View>
      );
    }
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
        {type !== 'person' && (
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
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderListHeader()}
      <FlatList
        data={movies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) =>
          type === 'person' ? (
            <PersonItem
              item={item}
              width={120}
              height={140}
              type={personType}
            />
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
  titleForSkeleton: {
    height: 21,
    borderRadius: 4,
    width: 100,
  },
});

export default HorizonalList;
