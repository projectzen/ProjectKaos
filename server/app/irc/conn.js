
module.exports = function(server, nickname, channels) {
	var irc = require('irc');
	var client = new irc.Client(server, nickname, channels);

	client.addlistener('message', function(from, to, message) {
		// do something
	});

	client.addlistener('pm', function(from, message) {
		// do something
	});

    client.addlistener('error', function(message) {
        // do something
    });

	return client;
}

