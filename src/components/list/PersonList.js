import {useScrollToTop} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import GlobalStyles from '../../../assets/styles/GlobalStyles';
import {api} from '../../helpers/ApiHelper';
import {dimentions, skeletonDummyData} from '../../utils/Utils';
import PersonItem from '../list-item/PersonItem';
import GridList from './GridList';
import {PersonTypes} from './../../constants/Types';

type Props = {
  categories: PersonTypes,
};

const PersonList = ({categories}: Props) => {
  const [data, setData] = useState(skeletonDummyData(20));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  const ref = useRef(null);
  useScrollToTop(ref);

  const getData = async () => {
    setLoading(true);
    setError(false);
    const {success, data, next} = await api(nextPage ?? 'person', {
      categories,
      limit: 20,
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
            type={categories}
          />
        )}
      />
    </View>
  );
};

export default PersonList;
