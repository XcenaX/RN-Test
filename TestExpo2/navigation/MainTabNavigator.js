import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen'
import RegScreen from '../screens/RegScreen';
import Meteor from 'react-native-meteor';

const RootStack = createStackNavigator({
  Home: HomeScreen,
  Login: LoginScreen,
  Reg: RegScreen,
  Console: LinksScreen
});
export default RootStack;


// HomeStack.navigationOptions = {
//   tabBarLabel: 'Главная',
//
//   headerMode: 'none',
//   header: null,
//   tabBarOptions: {
//     labelStyle: {
//       fontSize: 12,
//     },
//     tabStyle: {
//       height: 70,
//       marginTop: 10,
//     },
//   }
// };
//
//
// const LinksStack = createStackNavigator({
//   Links: LinksScreen,
// });
//
// LinksStack.navigationOptions = {
//   tabBarLabel: 'Панель управления',
//
//   tabBarOptions: {
//     labelStyle: {
//       fontSize: 12,
//     },
//     tabStyle: {
//       height: 70,
//       marginTop: 10,
//     },
//     header: null,
//     headerMode: 'none',
//   }
// };
//
// LinksStack.navigationOptions = ({ navigation }) => {
//   const users = Meteor.collection('Users').find({isLogged:true});
//   let navigationOptions = navigation;
//   if (users.length === 1) {
//     navigationOptions.tabBarVisible = true;
//   }
//   else{
//     navigationOptions.tabBarVisible = false;
//   }
//
//   return navigationOptions;
// };
//
// const Reg = createStackNavigator({
//   Links: RegScreen,
// });
//
// Reg.navigationOptions = {
//   tabBarLabel: 'Регистрация',
//
//   tabBarOptions: {
//     labelStyle: {
//       fontSize: 12,
//     },
//     tabStyle: {
//       height: 70,
//       marginTop: 10,
//     },
//     header: null,
//     headerMode: 'none',
//   }
// };
//
// Reg.navigationOptions = ({ navigation }) => {
//   const users = Meteor.collection('Users').find({isLogged:true});
//   let navigationOptions =navigation;
//   if (users.length === 1) {
//     navigationOptions.tabBarVisible = false;
//   }
//   else{
//     navigationOptions.tabBarVisible = true;
//   }
//   return navigationOptions;
// };
//
//
// const Login = createStackNavigator({
//   Links: LoginScreen,
// });
//
// Login.navigationOptions = {
//   tabBarLabel: 'Вход',
//   tabBarOptions: {
//     labelStyle: {
//       fontSize: 12,
//     },
//     tabStyle: {
//       height: 70,
//       marginTop: 10,
//     },
//     header: null,
//     headerMode: 'none',
//     showLabel:false
//   }
// };
//
// Login.navigationOptions = ({ navigation }) => {
//   const users = Meteor.collection('Users').find({isLogged:true});
//   let navigationOptions =navigation;
//   if (users.length === 1) {
//     navigationOptions.tabBarVisible = false;
//   }
//   else{
//     navigationOptions.tabBarVisible = true;
//   }
//   return navigationOptions;
// };













const styles = StyleSheet.create({
  headerButton:{
    height: 70,
    marginTop: 10,
    fontSize: 15
  },
});
