import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  index_container:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    width: '80%',
    marginTop: 5,
    height: 48,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    marginTop: 5,
    width: '80%',
    padding: 10
  },
  list_container: {
    width: '100%',
  },
  list: {
    flexDirection:'row',
    backgroundColor: '#DDDDDD',
    borderColor: 'black',
    borderBottomWidth: 2,
  },
  username: {
    width: '60%',
  },
  edit: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  delete: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
  },
});

export default styles;