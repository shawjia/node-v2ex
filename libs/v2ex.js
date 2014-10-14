var request = require('request');

var V2EX = function(options){
	this.options = options;
};

V2EX.prototype.get = function(api, callback){
	var url = this.options.api + api;
	return request(url, function(err, res, body){
		var data;
		try{
			data = JSON.parse(body);
		}catch(e){
			return callback(e);
		}
		callback(err, data, res);
	});
};

V2EX.prototype.hot = function(callback){
	this.get('/topics/hot.json', callback);
};

V2EX.prototype.latest = function(callback){
	this.get('/topics/latest.json', callback);
};

V2EX.prototype.getReplies = function(topicId, callback){
	this.get('/replies/show.json?topic_id=' + topicId, callback);
};

V2EX.prototype.node = function(name, callback){
	this.get('/nodes/show.json?name=' + name, callback);
};

V2EX.prototype.profile = function(id, callback){
	var field = 'id';
	if(/^@/.test(id)){
		id = id.substr(1);
		field = 'username';
	}
	this.get('/members/show.json?' + field + '=' + id, callback);
};

module.exports = V2EX;
