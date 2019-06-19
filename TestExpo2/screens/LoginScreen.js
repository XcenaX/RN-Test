import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TextInput,
  AsyncStorage
} from 'react-native';
import { MonoText } from '../components/StyledText';


 import {StackNavigator} from 'react-navigation';
 import SQL from "../components/Sqlite";
import Meteor, { createContainer,withTracker } from 'react-native-meteor'

class LoginScreen extends React.Component{
  constructor(props) {
      super(props);
      this.state = { password: '', email:'' , error:''};
    }
    HeaderContent(){
        return(
          <View style={{flexDirection:'row' ,flex:1, alignItems:'center'}}>
            <Button style={styles.headerButton} title='Главная' onPress={() => this.props.navigation.navigate('Home')}/>
            <Button style={styles.headerButton} title='Регистрация' onPress={() => this.props.navigation.navigate('Reg')}/>
          </View>
        );
    }
    onLoginPress = () => {
        Meteor.loginWithPassword(this.state.email, this.state.password, (err)=>{
          if (err) {
          this.setState({ error: error.reason });
          }
        });
      }
render(){
  return (
<View style={{flex:1,flexDirection:'column'}}>
<View style={styles.header}>
  <View style={{flexDirection:'column' ,flex:0.8, justifyContent:'center'  }}><Text style={{fontSize:20,}}>Вход</Text></View>
  {this.HeaderContent()}
</View>
    <View style={styles.container}>
      <View style={styles.main}>
          <Text style={{fontSize:12, color:'red',margin:10 , alignItems:'center', justifyContent:'center'}}>{this.state.error}</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Email'
            onChangeText={(emailInput) => this.setState({email: emailInput})}
            value={this.state.email}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.textInput}
            placeholder='Пароль'
            onChangeText={(passwordInput) => this.setState({password: passwordInput})}
            value={this.state.password}
          />
          <Button
          onPress={this.onLoginPress}
           style={styles.loginButton}
           title='Войти'/>

      </View>
    </View>
    </View>
  );
}
}

LoginScreen.navigationOptions = {
  header: null,
};

const container =  withTracker(params => {
  Meteor.subscribe('getAllUsers')  
  return {
    Users: Meteor.collection('Users').find({}),
    user: Meteor.user(),
  };
})(LoginScreen);

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

  },
  main:{
    justifyContent: 'space-around',
    alignItems:'center',
    flexDirection:'column',
    alignSelf:'center',
    flex:1,
    height:200,
  //  backgroundColor:'yellow',
  },
  loginButton:{
    backgroundColor: 'blue',
    alignItems: 'center',
    width: 100,
    height:50,
    fontSize: 15,
  },
});
