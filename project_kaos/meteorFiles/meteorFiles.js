Friends = new Mongo.Collection("friends");

if (Meteor.isClient) {
      // counter starts at 0
      //Session.setDefault('counter', 0);
   
   Template.body.helpers({
                         friends: function(){
                         return Friends.find({}, {sort:{createdAt: -1}});
                         }
                         });
   Template.body.events({
                        "submit .new-friend": function(event){
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

