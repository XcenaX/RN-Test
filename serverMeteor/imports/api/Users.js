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
Meteor.publish('currentUser',()=>{
  console.log("id: "+this.userId);
  return this.userId == undefined ? null : Meteor.users.find({_id:this.userId}, {limit:1, fields: {profile:1}});
})
