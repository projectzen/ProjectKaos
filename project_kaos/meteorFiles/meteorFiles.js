Friends = new Mongo.Collection("friends");

if (Meteor.isClient) {
      // counter starts at 0
      //Session.setDefault('counter', 0);
   
   Template.body.helpers({
      friends: function(){
         if (Session.get("hideCompleted")){
            return Friends.find({checked: {$ne: true}}, {sort:{createdAt: -1}});
         } else {
            return Friends.find({}, {sort:{createdAt: -1}});
         }
      },
      hideCompleted: function () {
         return Session.get("hideCompleted");
      },
      incompleteCount: function () {
         return Friends.find({checked: {$ne: true}}).count();
      }
   });
   Template.body.events({
      "change .hide-completed input": function (event){
         Session.set("hideCompleted",event.target.checked);
      },
      "submit .new-friend": function (event) {
         var text = event.target.text.value;
                        Meteor.call("addFriend",text);
         event.targer.text.value="";
         return false;
      }
                        
   });
   Template.friend.events({
                        "click .toggle-checked":function () {
                          Meteor.call("setChecked", this._id, ! this.checked);
                        },
                          "click .delete": function () {
                          Meteor.call("deleteFriend", this._id);
                          }
                          });
   Accounts.ui.config({
      passwordSignupFields: "USERNAME_ONLY"
                      });
   
}

Meteor.methods({
   addFriend: function (text) {
      if (! Meteor.userId()){
         throw new Meteor.Error("not-authorized");
      }
      Friends.insert({
         text:text,
         createdAt: new Date(),
         owner: Meteor.userID(),
         username: Meteor.user().username
      });
   },
               deleteFriend: function (friendId){
               Friends.remove(friendId);
               },
               setChecked: function (friendId, setChecked){
               Friends.update(friendId, {$set: {checked: setChecked} });
               }
               });
/* Template.hello.events({
 'click button': function () {
 // increment the counter when button is clicked
 Session.set('counter', Session.get('counter') + 1);
 }
 });
 }
 
 if (Meteor.isServer) {
 Meteor.startup(function () {
 // code to run on server at startup
 });
 }
 */

