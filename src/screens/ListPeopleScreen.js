import React, { useState, useEffect, useContext } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import SearchBar from '../components/SearchBar'
import PeopleList from '../components/PeopleList'
import { Feather } from '@expo/vector-icons';
import { AppContext } from '../state/AppContext'

const ListPeopleScreen = () => {
    const [term, setTerm] = useState('')
    const [results, setResults] = useState(null);
    const { state, dispatch } = useContext(AppContext);
    const [hasError, setErrors] = useState(false);
    const [people, setPeople] = useState({});

    if (state.isPeopleDirty && !state.isFetchingPeople) {
      dispatch({type: "START_FETCH_PEOPLE"});
    }

    const data = (results !== null) ? results : state.people;

    useEffect(() => {
      if (term.length === 0) {
        setResults(null);
      } else {
        let lowerTerm = term.toLowerCase();

        let newResults = state.people.filter((x) => {
          return x.name.toLowerCase().includes(lowerTerm);
        })

        setResults(newResults);
      }
    }, [term])

    return (
      <>
        { state.isPeopleDirty || state.isFetchingPeople ?
          <Text style={styles.loadingStyle} >Loading...</Text>
          :
          <View>
            <SearchBar 
                term={term} 
                onTermChange={newTerm => setTerm(newTerm)} 
                onTermSubmit={() => console.log('Term was submitted')} 
            />
            {hasError ? <Text>{hasError}</Text> : null}
            <ScrollView>
              <PeopleList results={data} />
            </ScrollView>
          </View>
        }
      </>
    ) 
};

ListPeopleScreen.navigationOptions = ({ navigation }) => ({
  title: "Employees on Leave",
  headerRight: 
    <TouchableOpacity onPress={() => navigation.navigate("CreateEditPersonScreen")}>
      <Feather name="plus" size={30} style={styles.iconStyle} />
    </TouchableOpacity>
});


const styles = StyleSheet.create({
  iconStyle: {
    paddingLeft: 10,
  },
  loadingStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#e0928e',
    textAlign: 'center',
    textAlign: 'center',
    paddingTop: 20, 
  }
});

export default ListPeopleScreen