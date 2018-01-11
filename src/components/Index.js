
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  AsyncStorage,
  Alert,
  Modal
} from 'react-native';
import styles from './../styles'


var user_list = [];
var user = null;

AsyncStorage.getItem('user_list', (err, result) => {
  if (result!=null) {
    user_list = JSON.parse(result)
  }
});

AsyncStorage.getItem('user', (err, result) => {
  if (result!=null) {
    user = JSON.parse(result)
  }
});

export default class Index extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  constructor(props) {
    super(props);
    this.state = { 
      visible: false,
      select_user:{
        username:'',
        email:'',
      }
    };

    this.user_select = this.user_select.bind(this)
    this.user_edict = this.user_edict.bind(this)
    this.cange_email = this.cange_email.bind(this)
  }
  cange_email(text){
    user = this.state.select_user
    user.email = text
    this.setState({ select_user: user })
  }
  user_select(user){
    this.setState({ select_user: user, visible: true })
  }
  user_edict(){
    for(var i = 0; i < user_list.length; i++) {
      if (user_list[i].username== this.state.select_user.username) {
        user_list[i].email = this.state.select_user.email
        this.setState({visible: false })
        AsyncStorage.setItem('user_list', JSON.stringify(user_list))
      }
    }
  }
  componentDidMount() {
   var intervalId = setInterval(this.get_user_list, 1000);
   // store intervalId in the state so it can be accessed later:
   this.setState({intervalId: intervalId});
  }
  componentWillUnmount() {
     // use intervalId from the state to clear the interval
     clearInterval(this.state.intervalId);
  }
  get_user_list() {
    AsyncStorage.getItem('user_list', (err, result) => {
      if (result!=null) {
        user_list = JSON.parse(result)
      }
    });
  }
  user_delete(user){
    for(var i = 0; i < user_list.length; i++) {
      if (user_list[i].username==user.username) {
        user_list.splice(i, 1);
        AsyncStorage.setItem('user_list', JSON.stringify(user_list))
      }
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.index_container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.visible}
          onRequestClose={() => {console.log("Modal has been closed.")}}
          >
          <View
            style={styles.index_container}
          >
            <Text style={styles.welcome}>
              Edict User: {this.state.select_user.username}
            </Text>
            <TextInput 
              style={styles.input} 
              placeholder="Username" 
              editable={false}
              value={this.state.select_user.username}
            />
            <TextInput 
              style={styles.input} 
              placeholder="Email"
              keyboardType='email-address' 
              onChangeText={ (text) => this.cange_email(text) }
              value={this.state.select_user.email}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.user_edict()}
            >
              <Text> Edit </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { this.setState({visible: false })}}
            >
              <Text> Cancel </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate('Register')}
        >
          <Text> New User </Text>
        </TouchableOpacity>
        <Text style={styles.welcome}>
          User List
        </Text>
        <ScrollView style={styles.list_container}>
          { 
            user_list &&
            user_list.map(
              (user, index) => (
                <View style={styles.list} key={'user_'+user.username}>
                  <View style={styles.username} >
                    <Text style={styles.welcome}>
                      {user.username}
                    </Text> 
                  </View>
                  <TouchableOpacity 
                    onPress={()=>{
                      Alert.alert(
                        'Delete User',
                        'Delete '+user.username,
                        [
                          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                          {text: 'OK', onPress: () => this.user_delete('OK Pressed'), style: 'cancel'},
                        ],
                        { cancelable: false }
                      )
                    }}
                    style={styles.delete}
                  >
                    <Text>
                      Delete
                    </Text> 
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.edit}
                    onPress={()=>{this.user_select(user)}}
                  >
                    <Text>
                      Edit
                    </Text> 
                  </TouchableOpacity>
                </View>
              )
            )
          }
        </ScrollView>
      </View>
    );
  }
}