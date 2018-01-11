/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { StackNavigator } from 'react-navigation';
import Login from './components/Login';
import Register from './components/Register';
import Index from './components/Index';


export default App = StackNavigator({
  Login: { screen: Login },
  Index: { screen: Index },
  Register: { screen: Register },
});

