import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState, Component } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppNavigator from './navigation/AppNavigator';
import Meteor from 'react-native-meteor';
import {NetworkInfo} from 'react-native-network-info';

export default class App extends React.Component {
  componentDidMount(){
    //const ip = NetworkInfo.getIPAddress();
    Meteor.connect('http://10.12.0.163:3000/websocket/');
  }
  render(){
    return(
      <View style={styles.container}>
      <AppNavigator/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
