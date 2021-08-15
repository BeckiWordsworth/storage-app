import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation'
import PersonDetail from './PersonDetail'

const PeopleList = ({title, results, navigation}) => {
    return (
      <View style={styles.containerStyle}>
          <Text style={styles.title}>{title}</Text>
          <FlatList 
            showsHorizontalScrollIndicator={false}
            data={results}
            keyExtractor={(result) => {result.id}}
            renderItem={({ item }) => {
                return (
                  <TouchableOpacity onPress={() => navigation.navigate('ShowPersonScreen', {item: item})} >
                    <PersonDetail  result={item} />
                  </TouchableOpacity>
                )
            }}
          />
      </View>  
    )
};

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 5
    },
    containerStyle: {
        borderTopWidth: 0.5,
        borderColor: '#dddddd',
        marginTop: 0,
        marginBottom: 0
    } 
})

export default withNavigation(PeopleList)