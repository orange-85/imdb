import {useNavigation, useScrollToTop} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import GlobalStyles from '../../../assets/styles/GlobalStyles';
import {api, LIMIT} from '../../helpers/ApiHelper';
import {dimentions, skeletonDummyData} from '../../utils/Utils';
import PersonItem from '../list-item/PersonItem';
import GridList from './GridList';
import {PersonTypes} from './../../constants/Types';

type Props = {
  type: PersonTypes,
  term: string,
};

const PersonList = ({type, term}: Props) => {
  const [data, setData] = useState(skeletonDummyData(LIMIT));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  const ref = useRef(null);
  useScrollToTop(ref);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (term == null || term.length === 0) {
      return;
    }
    navigation.setOptions({
      headerTitle: () => (
        <Text
          numberOfLines={1}
          style={{
            fontSize: 18,
            textTransform: 'capitalize',
            color: '#000',
            fontWeight: 'bold',
          }}>
          {term}
        </Text>
      ),
    });
  }, [navigation]);

  const getData = async () => {
    setLoading(true);
    setError(false);
    const {success, data, next} = await api(nextPage ?? 'person', {
      categories: type,
      search: term,
      limit: LIMIT,
      country: 'USA',
    });
    if (success) {
      setData((artists) =>
        nextPage ? [...artists, ...data.results] : data.results,
      );
      setNextPage(next);
    } else {
      setError(false);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={GlobalStyles.container}>
      <GridList
        data={data}
        loading={loading}
        error={error}
        hasLoadMore={nextPage !== null}
        onLoadMore={getData}
        renderItem={({item, index}) => (
          <PersonItem
            item={item}
            width={dimentions.width / 2 - 25}
            height={dimentions.width / 2}
            style={[
              {marginTop: 5, marginBottom: 5},
              index % 2 != 0 && {marginRight: 0},
            ]}
            type={type}
          />
        )}
      />
    </View>
  );
};

export default PersonList;
