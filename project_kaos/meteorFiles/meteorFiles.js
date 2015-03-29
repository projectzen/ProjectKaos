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
                         }
                         });
   Template.body.events({
                        "change .hide-completed input": function (event){
                        Session.set("hideCompleted",event.target.checked);
                        },
                        "submit .new-friend": function (event) {
                        var text = event.target.text.value;
                        Friends.insert({
                                       text: text,
                                       createdAt: new Date()
                                       //realName: text//current time
                                       });
                        event.targer.text.value="";
                        return false;
                        }
                        
                        });
   Template.friend.events({
                        "click .toggle-checked":function () {
                          Friends.update(this._id, {$set: {checked: ! this.checked}});
                        },
                          "click .delete": function () {
                          Friends.remove(this._id);
                          }
                          });
   
}

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

