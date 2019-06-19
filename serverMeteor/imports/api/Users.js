import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base'

export const Users = Meteor.users;

Meteor.methods({
  AddUser( data ){
    Accounts.createUser(data);
  },
  UpdateTextUser(textInput){
    Meteor.users.update({_id: this.userId}, {$set: {"profile.text": textInput}});
  },
})

Meteor.publish( 'getAllUsers', () => {
  return Meteor.users.find({})
})
// Meteor.publish('currentUser',()=>{
//   console.log("id: "+this.userId);
//   return Meteor.users.find({}, {fields: {_id: this.userId}});
// })
