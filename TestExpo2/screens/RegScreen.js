import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';
import {Constants} from 'expo';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TextInput
} from 'react-native';

import { MonoText } from '../components/StyledText';
import Meteor, {createContainer,withTracker } from 'react-native-meteor';


export class RegScreen extends React.Component {
  constructor(){
    super()
    this.state = {
      email: '',
      password: '',
      passwordConfirm:'',
      error:"",
    }
    this.FindSame = this.FindSame.bind(this);
  }
  FindSame(element, index, array){
    return element.password === this.state.password&&element.passwordConfirm===this.state.passwordConfirm;
  }
  HeaderContent(){
      return(
        <View style={{flexDirection:'row' ,flex:1, alignItems:'center'}}>
          <Button style={styles.headerButton} title='Главная' onPress={() => this.props.navigation.navigate('Home')}/>
          <Button style={styles.headerButton} title='Вход' onPress={() => this.props.navigation.navigate('Login')}/>
        </View>
      );
  }
    addUser = () => {
      if(this.state.password != this.state.passwordConfirm){
        this.setState({error:"Пароли не совпадают!"});
        return;
      }
        const profile = {
          text:''
        }
        const data = {
          email: this.state.email,
          password: this.state.password,
          username: this.state.email,
          profile: profile
        }
        console.log("Reg screen adduser : "+data);

        Meteor.call('AddUser', data,  err => {
          if( err ){
            console.log( err );
            this.setState({error:err.reason});
          } else {
            this.setState({
              email: '',
              password: '',
              passwordConfirm:''
            })
            this.props.navigation.navigate("Login");
          }
        })
      }
render(){
  return (
    <View style={{flex:1,flexDirection:'column'}}>
    <View style={styles.header}>
      <View style={{flexDirection:'column' ,flex:0.8, justifyContent:'center'  }}><Text style={{fontSize:20,}}>Регистрация</Text></View>
      {this.HeaderContent()}
    </View>
    <View style={styles.container}>
      <View style={styles.main}>
      <Text style={{color:'red', fontSize:15}}>{this.state.error}</Text>
          <TextInput
            placeholder='Email'
            style={styles.textInput}
            onChangeText={(emailInput) => this.setState({email: emailInput})}
            value={this.state.email}
          />
          <TextInput
            placeholder='Пароль'
            style={styles.textInput}
            onChangeText={(passwordInput) => this.setState({password: passwordInput})}
            value={this.state.password}
            />
            <TextInput
              placeholder='Подтвердите пароль'
              style={styles.textInput}
              onChangeText={(passwordConfirmInput) => this.setState({passwordConfirm: passwordConfirmInput})}
              value={this.state.passwordConfirm}
              />
            <Button style={styles.loginButton} title='Регистрация' onPress={this.addUser}/>
        </View>
        </View>
        </View>
  );
}
}
RegScreen.navigationOptions = {
  header: null,
};


const container =  withTracker(params => {
  Meteor.subscribe('currentUser')
  return {    
    user: Meteor.user(),
  };
})(RegScreen);

container.navigationOptions = { header: null}
export default container;

const styles = StyleSheet.create({
  buttonHeader:{
    fontSize:15,
    margin:15,
    flex:0.5,
    flexDirection:'column',
  },
  header:{
    height: 20,
    flex:0.1,
    flexDirection:'row',
    backgroundColor:'lightblue',
    alignItems:'flex-end'
  },
  container: {
    //backgroundColor: 'black',
    flex: 1,
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'stretch',
     alignSelf:'center',
   width: 200,
  },
  textInput:{
    backgroundColor:'white',
    borderColor:'gray',
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    height:40,
    alignSelf:'stretch'
  },
  main:{
    justifyContent: 'space-around',
    alignItems:'center',
    flexDirection:'column',
    alignSelf:'center',
    flex:1,
    height:300,
  //  backgroundColor:'yellow',
  },
  loginButton:{
    backgroundColor: 'blue',
    alignItems: 'center',
    width: 100,
    height:50,
    fontSize: 15,
    marginTop:15,
  },
});
