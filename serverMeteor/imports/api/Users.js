import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base'

export const Users = new Mongo.Collection( 'Users' );

Meteor.methods({
  AddUser( data ){
    Accounts.createUser(data);
  },
  UpdateTextUser(textInput){
    Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.text": textInput}});
  },
})

Meteor.publish( 'getAllUsers', () => {
  return Meteor.users.find({})
})
