import React, { Component } from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Input } from 'react-native-elements'
import { AppContext } from '../state/AppContext'
import moment from 'moment'
//React Native Navigation is not supported in hooks yet, so have to create a class component for this one.


const styles = StyleSheet.create({
  containerView: {
    marginTop: 20,
  },  
  textInputStyle: {
    borderColor: 'black',
    borderStyle: 'solid',
    backgroundColor: '#F0EEEE'
  },
  inputContainerStyle: {
    marginBottom: 10,
  },
  loadingStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#e0928e',
    textAlign: 'center',
    paddingTop: 20,
  }
})


export default class CreateScreen extends Component {

  static contextType = AppContext;

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return { ...params, title: "Editing Employee" };
  };

  state = {
    hitSaveButton: false,

    name: '',
    leave_date: '',
    return_date: '',
    computers: '',
    desks: '',
    chairs: '',
    monitors: '',
    boxes: ''
  };

  componentDidMount() {
    const {
      props: {navigation}
    } = this;

    let dispatch = this.context.dispatch;
    let item = navigation.getParam("item");
    
    if (item) {
      let formattedLeave;
      let formattedReturn;

      try {
        formattedLeave = moment(item.leave_date).format('YYYY-MM-DD');
      } catch(e) {
        formattedLeave = "";
      }

      try {
        formattedReturn = moment(item.return_date).format('YYYY-MM-DD');
      } catch(e) {
        formattedReturn = "";
      }

      this.setState({
        _id: item._id,
        name: item.name,
        leave_date: formattedLeave,
        return_date: formattedReturn,
        computers: item.computers,
        desks: item.desks,
        chairs: item.chairs,
        monitors: item.monitors,
        boxes: item.boxes
      })
    }

    navigation.setParams({name: "Editing Employee"});

    // Setup Header
    navigation.setParams({
      headerRight: 
        <TouchableOpacity onPress={() => { this.submitData(); }}>
          <AntDesign name="save" size={30} style={styles.iconStyle} />
        </TouchableOpacity>
    });
  };

  submitData() {
    let dispatch = this.context.dispatch;

    let payload = {
      _id: this.state._id,
      name: this.state.name,
      leave_date: this.state.leave_date,
      return_date: this.state.return_date,
      computers: this.state.computers,
      desks: this.state.desks,
      chairs: this.state.chairs,
      monitors: this.state.monitors,
      boxes: this.state.boxes
    }

    dispatch({type: 'START_SAVE_PERSON', payload: payload});
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      props: { navigation },
      state: { hitSaveButton },
    } = this

    let appState = this.context.state;

    if (appState.isSavingPerson) {
      if (prevState.hitSaveButton != true) {
        this.setState({
          hitSaveButton: true
        });  
      }
    } else {
      if (hitSaveButton) {
        if (prevState.hitSaveButton != false) {
          this.setState({
            hitSaveButton: false
          });  
        }
  
        navigation.navigate("ListPeopleScreen")
      }
    }
  }

  render() {
    const {
      props: { isSavingPerson, navigation },
      state: { name, leave_date, return_date, computers, desks, chairs, monitors, boxes, hitSaveButton },
    } = this

    return (
      <View style={styles.containerView}>
        { hitSaveButton ?
          <Text style={styles.loadingStyle}>Saving...</Text> 
        :
          <View>
            <Input label="Employee Name" value={name} onChangeText={(name) => this.setState({name})} containerStyle={styles.inputContainerStyle} />
            <Input label="Leaving Date" value={leave_date} onChangeText={(leave_date) => this.setState({leave_date})} containerStyle={styles.inputContainerStyle} placeholder="YYYY/MM/DD" />
            <Input label="Return Date" value={return_date} onChangeText={(return_date) => this.setState({return_date})} containerStyle={styles.inputContainerStyle} placeholder="YYYY/MM/DD" />
            <Input label="Computers" value={String(computers)} onChangeText={(computers) => this.setState({computers})} containerStyle={styles.inputContainerStyle} />
            <Input label="Monitors" value={String(monitors)} onChangeText={(monitors) => this.setState({monitors})} containerStyle={styles.inputContainerStyle} />
            <Input label="Desks" value={String(desks)} onChangeText={(desks) => this.setState({desks})} containerStyle={styles.inputContainerStyle} />
            <Input label="Chairs" value={String(chairs)} onChangeText={(chairs) => this.setState({chairs})} containerStyle={styles.inputContainerStyle} />
            <Input label="Boxes" value={String(boxes)} onChangeText={(boxes) => this.setState({boxes})} containerStyle={styles.inputContainerStyle} />
          </View>
        }
      </View>  
    );
  }}