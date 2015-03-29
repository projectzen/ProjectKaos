// counter starts at 0
//Session.setDefault('counter', 0);

Template.body.helpers({
	friends: function(){
		return Friends.find({}, {sort:{createdAt: -1}});
	}
});
Template.body.events({
	"click #submitConnection": function(event, template){
		var server = template.find('[name="server"]').value;
		var nick = template.find('[name="nick"]').value;
		var channel = template.find('[name="channel"]').value;
		Meteor.call('newConn', server, nick, channel, Meteor.userId());
	},
	"submit .send-message": function(event, template) {
		var message = event.target.message.value;
		Meteor.call('sendMessage', message, Meteor.userId());
	}
});

Template.main.helpers({
	userLoggedIn: function() {
		return Meteor.user()
	},
	connectionSet: function() {
		return Connections.find({userId: Meteor.userId()}).fetch().length > 0;
	},
	userMessages: function() {
		return Messages.find({userId: Meteor.userId()});
	}
});
