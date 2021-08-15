import React from 'react';
import { View, Image, Text, StyleSheet} from 'react-native';
import moment from 'moment'

const PersonDetail = ({ result }) => {
    let isThisWeek = (moment().isoWeek() == moment(result.return_date).isoWeek())
    let formattedLeave = moment(result.leave_date).format('MMM Do YYYY');
    let formattedReturn = moment(result.return_date).format('MMM Do YYYY');

    return (
        <View style={styles.containerStyle} >
          <Image style={styles.imageStyle} source={require('../../assets/box-outline-filled.png')} />
          <View style={styles.contentStyle}>
            <Text style={styles.nameStyle}>{result.name}</Text>
            <Text style={styles.metaStyle}>{formattedLeave} -&gt; {formattedReturn}</Text>
            {isThisWeek ? <Text style={styles.warningStyle}>Returning soon - book redelivery!</Text>: null}
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        padding: 10,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: '#dddddd'
    },
    imageStyle: {
        width: 70,
        height: 70,
        borderRadius: 4,
        marginRight: 10,
    },
    contentStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    nameStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlignVertical: 'center',
    },
    metaStyle: {
        fontSize: 14,
        textAlignVertical: 'center',
    },
    warningStyle: {
        fontSize: 14,
        color: '#FF0000'
    }
});

export default PersonDetail