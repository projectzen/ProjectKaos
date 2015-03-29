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
		Meteor.call('newConn', server, nick, channel);
	}

});
Template.main.helpers({
	userLoggedIn: function() {
		return Meteor.user()
	}
});
