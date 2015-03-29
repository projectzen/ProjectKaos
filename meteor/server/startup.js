Meteor.startup(function() {
	IRC = Meteor.npmRequire("irc");
	Fiber = Meteor.npmRequire('fibers');
	IRCClients = {}
	//Discard all old connections
	Connections.remove({});
});
