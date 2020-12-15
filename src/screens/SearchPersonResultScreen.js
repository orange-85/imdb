import {useRoute} from '@react-navigation/native';
import React from 'react';
import PersonList from '../components/list/PersonList';

const SearchPersonResultScreen = () => {
  const {
    params: {type, term},
  } = useRoute();
  return <PersonList type={type} term={term} />;
};

export default SearchPersonResultScreen;
