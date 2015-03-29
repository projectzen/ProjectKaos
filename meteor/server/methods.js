Meteor.methods({
	newConn: function(server, nick, channel, userId) {
		var connectionId = Connections.insert({server: server, nick: nick, channel: channel, userId: userId});
		IRCClients[userId] = new IRC.Client(server, nick, {
			channels: [channel]
		});
		IRCClients[userId].addListener('message#', Meteor.bindEnvironment(function(from, to, message) {
			console.log(from + ": " + message);
			Messages.insert({from: from, message: message, connectionId: connectionId, userId: userId});
		}));
        IRCClients[userId].addListener('join', Meteor.bindEnvironment(function(channel, nick, message) {
            console.log(nick + ' joined ' + message);
            Messages.insert({from: channel, message:nick + ' joined ' + channel, connectionId: connectionId, userId: userId});
        }));
	},
	sendMessage: function(message, userId) {
		var channel = Connections.find({userId: userId}).fetch()[0].channel;
		var nick = Connections.find({userId: userId}).fetch()[0].nick;
		IRCClients[userId].say(channel, message);
		Messages.insert({from: nick, message: message, connectionId: Connections.find({userId: userId}).fetch()[0]._id, userId: userId});
	},
	disconnect: function(userId) {
		IRCClients[userId].disconnect();
		delete IRCClients.userId;
		Connections.remove({userId: userId});
		Messages.remove({userId: userId});
	}
});
