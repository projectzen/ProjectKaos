Meteor.methods({
	newConn: function(server, nick, channel, userId) {
		var connectionId = Connections.insert({server: server, nick: nick, channel: channel, userId: userId});
		IRCClients[Meteor.userId] = new IRC.Client(server, nick, {
			channels: [channel]
		});
		IRCClients[Meteor.userId].addListener('message#', Meteor.bindEnvironment(function(from, to, message) {
			console.log(from + ": " + message);
			Messages.insert({from: from, message: message, connectionId: connectionId, userId: userId});
		}));
	}
});
