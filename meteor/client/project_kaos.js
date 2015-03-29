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
Template.main.helpers({
	userLoggedIn: function() {
		return Meteor.user()
	}
});
