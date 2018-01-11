
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from 'react-native';
import styles from './../styles'

var user_list = [];

AsyncStorage.getItem('user_list', (err, result) => {
  if (result!=null) {
    user_list = JSON.parse(result)
  }
});

export default class Login extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };
  constructor(props) {
    super(props);
    this.state = { 
      text: '',
      username: null, 
      password: null, 
      modalVisible: false,
    };

    var user = null;
    AsyncStorage.getItem('user', (err, result) => {
      console.log(result);
      if (result!=null) {
        this.props.navigation.navigate('Index')
      }
    });
    this.login = this.login.bind(this)
  }
  login(){
    this2 = this
    user = user_list.filter(function (user) { return user.username == this2.state.username && user.password == this2.state.password })
    if (user.length == 0) {
      alert('User or Password does not match')
    }else{
      AsyncStorage.setItem('user', JSON.stringify(user[0]))
      this.props.navigation.navigate('Index')
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome!
        </Text>
        <TextInput 
          style={styles.input} 
          placeholder="Username" 
          onChangeText={ (text) => this.setState({ username: text }) }
          value={this.state.username}
        />
        <TextInput 
          style={styles.input} 
          secureTextEntry={true} 
          placeholder="Password" 
          onChangeText={ (text) => this.setState({ password: text }) }
          value={this.state.password}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.login()}
        >
          <Text> Login </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate('Register')}
        >
          <Text> Register </Text>
        </TouchableOpacity>
      </View>
    );
  }
}