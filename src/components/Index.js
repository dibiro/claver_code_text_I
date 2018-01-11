
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
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

export default class Index extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  constructor(props) {
    super(props);
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.index_container}>
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
                  <TouchableOpacity style={styles.edit}>
                    <Text>
                      Delete
                    </Text> 
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.delete}>
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