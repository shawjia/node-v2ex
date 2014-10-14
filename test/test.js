
var v2ex = require('v2ex');

v2ex.hot(function(err, topics){
	console.log(topics);
});

v2ex.latest(function(err, topics){
	console.log(topics);	
});

v2ex.node('name', function(err, node){
	console.log(node);
});

v2ex.profile('name', function(err, profile){
	console.log(profile);
});
