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
  PureComponent,
  TextInput
} from 'react-native';
import { MonoText } from '../components/StyledText';
import Meteor, { createContainer,withTracker } from 'react-native-meteor'

class LinksScreen extends React.Component{
  constructor(props) {
      super(props);
      this.state = { text:''};
      this.Save = this.Save.bind(this);
    }
  Save(){
    Meteor.call('UpdateTextUser', this.state.text , err => {
      if( err ){
        console.log( err );
        this.setState({error:err.reason});
      } else {
        this.setState({
          email: '',
          password: '',
          passwordConfirm:''
        })
        this.props.navigation.navigate("Home");
        this.setState({error:""});
      }
    })
  }

render(){
  return (
    <View style={{flex:1,flexDirection:'column'}}>
      <View style={styles.header}>
        <View style={{flexDirection:'column' ,flex:1, justifyContent:'center'  }}><Text style={{fontSize:20,}}>Панель управления</Text></View>
        <View>
          <Button style={styles.headerButton} title='Главная' onPress={() => this.props.navigation.navigate('Home')}/>
        </View>
      </View>
    <View style={styles.mainContainer}>
      <TextInput multiline={true} editable = {true} onChangeText={(textInput) => this.setState({text: textInput})} style={styles.input}/>
      <Button title="Сохранить" onPress={this.Save}/>
    </View>
    </View>
  );
}
}

LinksScreen.navigationOptions = {
  header:null,
};

const container =  withTracker(params => {
  Meteor.subscribe('getAllUsers')
  return {
    Users: Meteor.collection('Users').find({}),
    user: Meteor.user(),
  };
})(LinksScreen);

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
input:{
  backgroundColor:'white',
  borderColor:'gray',
  alignSelf: 'stretch',
  borderBottomWidth: 1,
  height:600,
  alignSelf:'stretch'

},
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  mainContainer:{
    flex:0.9,
    flexDirection:'column',
    alignItems:'center',
    margin:5,

  }
});
