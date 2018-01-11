
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

export default class Register extends React.Component {
  static navigationOptions = {
    title: 'Register',
  };
  constructor(props) {
    super(props);
    this.state = { 
      text: '',
      username: null, 
      password: null, 
      modalVisible: false,
    };
    this.register = this.register.bind(this)

  }
  register(){
    this2 = this
    if (this.state.password!=this.state.password2) {
      alert('Password does not match')
    }else if (user_list.filter(function (user) { return user.username == this2.state.username }).length > 0) {
      alert('User already registered')
    }else if (user_list.filter(function (user) { return user.email == this2.state.email }).length > 0) {
      alert('Email already registered')
    }else{
      user_list.push({
        username:this.state.username,
        email:this.state.email,
        password:this.state.password,
      });
      AsyncStorage.setItem('user_list', JSON.stringify(user_list))
      if (user) {
        this.props.navigation.navigate('Index')
      }else{
        this.props.navigation.navigate('Login')
      }
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
          placeholder="Email"
          keyboardType='email-address' 
          onChangeText={ (text) => this.setState({ email: text }) }
          value={this.state.email}
        />
        <TextInput 
          style={styles.input} 
          secureTextEntry={true} 
          placeholder="Password" 
          onChangeText={ (text) => this.setState({ password: text }) }
          value={this.state.password}
        />
        <TextInput 
          style={styles.input} 
          secureTextEntry={true} 
          placeholder="Repeat Password" 
          onChangeText={ (text) => this.setState({ password2: text }) }
          value={this.state.password2}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.register()}
        >
          <Text> Register </Text>
        </TouchableOpacity>
      </View>
    );
  }
}