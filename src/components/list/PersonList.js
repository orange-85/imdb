import {useScrollToTop} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import GlobalStyles from '../../../assets/styles/GlobalStyles';
import EmptyList from './EmptyList';
import ListFooter from './ListFooter';
import PersonItem from '../list-item/PersonItem';
import {api} from '../../helpers/ApiHelper';
import {dimentions} from '../../utils/Utils';

type Props = {
  categories: 'actor' | 'director',
};
const PersonList = ({categories}: Props) => {
  const [data, setData] = useState([]);
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
    });
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

  const loadMore = () => {
    if (!loading && nextPage) {
      getData();
    }
  };

  const renderFooter = () => {
    return nextPage && <ListFooter />;
  };

  return (
    <View style={GlobalStyles.container}>
      <FlatList
        ref={ref}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item, index}) => (
          <PersonItem
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
          data.length == 0 && {flex: 1},
        ]}
        numColumns={2}
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <EmptyList
            data={data}
            loading={loading}
            error={error}
            onPress={getData}
          />
        }
      />
    </View>
  );
};

export default PersonList;
