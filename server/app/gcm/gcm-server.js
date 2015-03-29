
modules.export = function(apiKey) {
	var gcm = require('gcm');
	var sender = new gcm.Sender(apiKey);

	return sender;
}

