Meteor.methods({
	newConn: function(server, nick, channel) {
		Connections.insert({server: server, nick: nick, channel: channel});
		IRCClients[Meteor.userId()] = new IRC.Client(server, nick, {
			channels: [channel]
		});
		IRCClients[Meteor.userId()].addListener('message#', function(from, to, message) {
			console.log(from + ": " + message);
		});
	}
});
