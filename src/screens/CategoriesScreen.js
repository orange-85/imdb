import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import CategoryItem from '../components/list-item/CategoryItem';
import GridList from '../components/list/GridList';
import {api} from '../helpers/ApiHelper';
import {dimentions} from '../utils/Utils';

const CategoriesScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  const getData = async () => {
    setLoading(true);
    setError(false);
    const {success, data, next} = await api(
      nextPage ?? 'category',
      nextPage ? null : {limit: 20},
    );
    if (success) {
      setData((artists) => [...artists, ...data.results]);
      setNextPage(next);
    }
    setLoading(false);
    setError(!success);
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
          <CategoryItem
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

export default CategoriesScreen;
