import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import TextBox from './TextBox';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import Button from './Button';
import Colors from '../constants/Colors';
import Screens from '../constants/Screens';
import Feather from 'react-native-vector-icons/Feather';
import {AnimationLayout} from '../utils/AnimationUtils';
import {StyleSheet, Text, View} from 'react-native';

const SearchBox = () => {
  const {navigate} = useNavigation();
  const [term, setTerm] = useState('');
  const searchTypes = [
    {type: 'movies', title: 'Movies'},
    {type: 'director', title: 'Directors'},
    {type: 'actor', title: 'Artists'},
  ];

  const search = (type) => {
    if (term.trim().length === 0) {
      return;
    }
    if (type == null || type === 'movies') {
      return navigate(Screens.MoviesList, {term});
    }
    navigate(Screens.SearchPersonResult, {type, term});
  };

  return (
    <View style={styles.container}>
      <TextBox
        placeholder="Search"
        returnKeyType="search"
        style={styles.textBox}
        value={term}
        onChangeText={(text) => {
          AnimationLayout(true);
          setTerm(text);
        }}
        onSubmitEditing={() => search(null)}
        button={
          <Button style={styles.searchButton} onPress={() => search(null)}>
            <Feather name="search" size={20} color={Colors.mainColor} />
          </Button>
        }
      />
      {term.length > 0 &&
        searchTypes.map((searchType, index) => (
          <Button
            key={index}
            style={styles.buttonContainer}
            onPress={() => search(searchType.type)}>
            <View style={styles.button}>
              <Feather
                name="search"
                size={20}
                color={Colors.subTitleTextColor}
              />
              {/* <Text style={styles.subTitle}> Search </Text> */}
              <Text style={styles.term}>{`${term}`}</Text>
              <Text style={styles.subTitle}> in </Text>
              <Text style={styles.type}>{searchType.title}</Text>
            </View>
          </Button>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.inputTextBackground,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    overflow: 'hidden',
  },
  textBox: {
    ...GlobalStyles.screenPadding,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 0,
  },
  searchButton: {
    paddingLeft: 20,
    paddingRight: 15,
    height: '100%',
    justifyContent: 'center',
  },
  buttonContainer: {
    justifyContent: 'flex-start',
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  term: {
    fontWeight: 'bold',
    marginLeft: 4,
  },
  subTitle: {
    color: Colors.subTitleTextColor,
  },
  type: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

export default SearchBox;
