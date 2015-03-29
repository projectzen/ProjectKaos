
var apikey = '';

var gcm = require('node-gcm');

function GCM_Server(apiKey) {
	this._gcm = gcm;
	this._sender = new gcm.Sender(apiKey);
};

GCM_Server.prototype = {
	_logError : function(err) {
		console.error(err);
	},

	_logSucc : function(result) {
		console.log(result);
	},

	send : function(message, regIDs, retries) {
        var i, j, tmp, chunk = 999;
        for (i=0,j=regIDs.length; i<j; i+=chunk) {
            tmp = regIDs.slice(i, i+chunk);
            this._sender.send(message, tmp, retries, function (err, result) {
                    if (err) consoler.error(err);
                    else     console.log(result);
            });
        }
    },

	sendNoRetry : function(message, regIDs) {
        var i, j, tmp, chunk = 999;
        for (i=0,j=regIDs.length; i<j; i+=chunk) {
            tmp = regIDs.slice(i, i+chunk);
            this._sender.sendNoRetry(message, tmp, function (err, result) {
                if (err) consoler.error(err);
                else     console.log(result);
            });
        }
    },

	// For creating messages
	message : function(options) {
		return new this._gcm.Message(options);
	},
}

var server = new GCM_Server(apikey)

module.exports = server;

