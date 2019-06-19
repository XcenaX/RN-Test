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
} from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import { MonoText } from '../components/StyledText';
import Meteor, {createContainer,withTracker} from 'react-native-meteor';

class HomeScreen extends React.Component {
  constructor() {
   super();
   this.state = {
     weatherData: null,
     iconUrl:'',
     min:'',
     max:'',
     windSpeed:'',
     current:'',
     description:'',
     loggedUser: [],
   };
   this.MarkdownText = this.MarkdownText.bind(this);
 }
 componentDidMount(){
   const apiKey = "ef90a3f31803944920fba94284bbf9a8";
   const AstanaId = "1526273";
   const URL = "http://api.openweathermap.org/data/2.5/weather?id="+AstanaId+"&appid="+apiKey;
   // fetch(URL).then(res => res.json()).then(json => {
   //   this.setState({ weatherData: json});
   //    const iconURL = "http://openweathermap.org/img/w/" + this.state.weatherData.weather[0].icon + ".png";
   //    const currentState = this.state.weatherData.main.temp;
   //    const minState = this.state.weatherData.main.temp_min;
   //    const maxState = this.state.weatherData.main.temp_max;
   //    const windSpeedState = this.state.weatherData.wind.speed;
   //    const descriptionState = this.state.weatherData.weather[0].description;
   //
   //    this.setState({ iconUrl: {iconURL}});
   //    this.setState({ current: {currentState}});
   //    this.setState({ min: {minState}});
   //    this.setState({ max: {maxState}});
   //    this.setState({ windSpeed: {windSpeedState}});
   //    this.setState({ description: {descriptionState}});
   //    console.log(this.state.weatherData);
   //    console.log(this.state.iconUrl);
   //  });
 }
  static navigationOptions = {
          header: null
      }
      HeaderContent(){
        if(Meteor.user() === null){
          return(
            <View style={{flexDirection:'row' , flex:1, alignItems:'center'}}>
              <Button style={styles.headerButton} title="Вход" onPress={() => this.props.navigation.navigate('Login')}/>
              <Button style={styles.headerButton} title="Регистрация" onPress={() => this.props.navigation.navigate('Reg')}/>
            </View>
          );
        }
        return(
          <View style={{flexDirection:'row' , flex:1, alignItems:'center'}}>
            <Button style={styles.headerButton} title='Панель' onPress={() => this.props.navigation.navigate('Console')}/>
            <Button style={styles.headerButton} title='Выход' onPress={Meteor.logout()}/>
          </View>
        );
      }
      MarkdownText(){
        if(Meteor.user() === null){
          return(
            <View>
            <Markdown>Войдите чтобы увидеть содержимое!</Markdown>
            </View>
          );
        }
        return(
          <View>
          <Markdown>{this.props.user.profile.text}</Markdown>
          </View>
        );
      }
  render() {
    return(
      <View style={{flex:1, flexDirection:'column'}}>

        <View style={styles.header}>
          <View style={{flexDirection:'column' , flex:1, justifyContent:'center'}}><Text style={{fontSize:20,}}>Главная</Text></View>
          {this.HeaderContent()}
        </View>

      <View style={{flex:0.9, justifyContent:'center' , flexDirection:'row'}}>

        <View style={styles.leftColumn}>
          {this.MarkdownText()}
        </View>

        <View style={styles.rightColumn}>
          <Image source={{uri:this.state.iconUrl.iconURL}} style={styles.iconWeather}/>
          <Text style={styles.textWeather, styles.description}>{this.state.description.descriptionState}</Text>
          <Text style={styles.textWeatherHeader}>Температура</Text>
          <Text style={styles.textWeather}>Сейчас: {this.state.current.currentState}</Text>
          <Text style={styles.textWeather}>Максимальная: {this.state.max.maxState}</Text>
          <Text style={styles.textWeather}>Минимальная: {this.state.min.minState}</Text>
          <Text style={styles.textWeather}>Ветер: {this.state.windSpeed.windSpeedState} м/сек</Text>
        </View>

      </View>
    </View>
    )
  }
}

const container =  withTracker(params => {
  Meteor.subscribe('getAllUsers')
  return {
    Users: Meteor.collection('Users').find({}),
    user: Meteor.user(),
  };
})(HomeScreen);

container.navigationOptions = { header: null}
export default container;

// const container = createContainer( () => {
//   Meteor.subscribe('getAllUsers')
//   Meteor.subscribe('getAllLogged')
//   Meteor.subscribe('getLoggedText')
//   return {
//     Users: Meteor.collection('Users').find({}),
//     Logged: Meteor.collection("Users").find({isLogged:true}),
//     LoggedText: Meteor.subscribe('getLoggedText')
//   }
// }, HomeScreen);




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
  leftColumn: {
    flex: 0.7,
    backgroundColor: 'white',
    borderWidth:0.5
  },
  rightColumn:{
    flex:0.3,
    backgroundColor: 'lightgray',
    borderWidth:0.5,
    flexDirection:"column",
    alignItems:'center'
  },
  iconWeather:{
    flexDirection:'row',
    height:80,
    width:80,
  },
  textWeather:{
    justifyContent:'center',
    fontSize:10,
    color:'white',

  },
  textWeatherHeader:{
    justifyContent:'center',
    fontSize:13,
    color:'red',
    margin:10

  },
  description:{
    margin:10,
    alignItems: "center"
  }

});
