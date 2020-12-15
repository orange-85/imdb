import {useScrollToTop} from '@react-navigation/native';
import React, {useRef} from 'react';
import {FlatList} from 'react-native';
import GlobalStyles from '../../../assets/styles/GlobalStyles';
import EmptyList from './EmptyList';
import ListFooter from './ListFooter';

type Props = {
  loading: boolean,
  error: boolean,
  data: [],
  renderItem: ({item: any, index: number}) => Node,
  onLoadMore: () => void,
  hasLoadMore: boolean,
};

const GridList = ({
  loading,
  error,
  data,
  renderItem,
  onLoadMore,
  hasLoadMore,
}: Props) => {
  const ref = useRef(null);
  useScrollToTop(ref);

  const loadMore = () => {
    if (!loading && hasLoadMore) {
      onLoadMore();
    }
  };

  const renderFooter = () => {
    return hasLoadMore && <ListFooter />;
  };

  return (
    <FlatList
      ref={ref}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
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
          onPress={onLoadMore}
        />
      }
    />
  );
};

export default GridList;
