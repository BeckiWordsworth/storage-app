import React, { useState, useEffect, useContext } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Button} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { AppContext } from '../state/AppContext'
import moment from 'moment'

const ResultEntry = ({title, children}) => {
    return (
      <View style={entryStyles.containerStyle}>
        <Text style={entryStyles.titleStyle}>{title}</Text>
        <Text style={entryStyles.contentStyle}>{children}</Text>
      </View>);
}

const entryStyles = {
    containerStyle: {
        marginBottom: 12,
    },
    titleStyle: {
        marginBottom: 4,
        color: '#707070'
    },
    contentStyle: {
        fontWeight: 'bold',
        fontSize: 16,
    }
}

const ShowPersonScreen = ({ navigation }) => {
    const [result, setResult] = useState({})
    const [pressedDeleteButton, setPressedDeleteButton] = useState(false);

    const item = navigation.getParam('item');
    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        navigation.setParams({
            name: item !== null ? `${item.name}` : "??"
          });
    }, [])

    useEffect(() => {
        if (state.isDeletingPerson) {
            setPressedDeleteButton(true);
        } else {
            if (pressedDeleteButton) {
                navigation.navigate("ListPeopleScreen")
            }
        }
    }, [state.isDeletingPerson])

    let formattedLeave = moment(item.leave_date).format('MMM Do YYYY');
    let formattedReturn = moment(item.return_date).format('MMM Do YYYY');

    return (
        <View>
            <View style={styles.heroStyle}>
                <Text style={styles.title}>{item.name}</Text> 
            </View>
            <View style={styles.contentArea}>
                <View style={styles.contentRow}>
                    <ResultEntry title="Leave Date">{formattedLeave}</ResultEntry>
                    <ResultEntry title="Return Date">{formattedReturn}</ResultEntry>
                </View>

                <ResultEntry title="Desks">{item.desks}</ResultEntry>
                <ResultEntry title="Chair">{item.chairs}</ResultEntry>
                <ResultEntry title="Computer">{item.computers}</ResultEntry>
                <ResultEntry title="Monitor">{item.monitors}</ResultEntry>
                <ResultEntry title="Boxes">{item.boxes}</ResultEntry>

                <Button title="Delete" color="#EE4411" onPress={() => { dispatch({type: "START_DELETE_PERSON", id:item._id})}} />
            </View>
        </View>  
    )
};

ShowPersonScreen.navigationOptions = ({ navigation }) => {
    const item = navigation.getParam('item');

    return {
        title: "Viewing Employee",
        headerRight: <TouchableOpacity onPress={() => navigation.navigate("CreateEditPersonScreen", {item: item})}>
          <AntDesign name="edit" size={30} style={styles.iconStyle} />
          </TouchableOpacity>
    }
};
    

const styles = StyleSheet.create({
    heroStyle: {
        backgroundColor: '#ffeaea',
        height: 150,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderColor: '#fbe2e3',
        borderBottomWidth: 3.0,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    }, 
    iconStyle: {
        paddingRight: 10
    },
    contentArea: {
        margin: 12,
    },
    contentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    } 
})

export default ShowPersonScreen
