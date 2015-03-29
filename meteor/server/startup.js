Meteor.startup(function() {
	IRC = Meteor.npmRequire("irc");
	IRCClients = {}
});
