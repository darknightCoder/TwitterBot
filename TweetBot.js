var Twit = require('twit'); 
var Config = require('./config');
//var cofig = new Cofig();
console.log('hi')

var TwitInstance = new Twit(Config);




var Retweet_Favourite = function (action) {
	var self = this;
	console.log('Retweeting');
 var params = {
        q: '#MEAN',  // REQUIRED
        result_type: 'recent',
        lang: 'en'
 }
 console.log('fetching data from:',TwitInstance);
 TwitInstance.get('search/tweets',params, function (err,data) {

 	if(!err) {
	console.log(data);
        var tweets = data.statuses;
        var randomTweet = randIndex(tweets);
	    if(typeof randomTweet != 'undefined')
	    	if(action === 'retweet')
		TwitInstance.post('statuses/retweet/:id', { id: randomTweet.id_str }, function(err,data) {
			if(!err) {
				console.log(data);
			}
			else
			console.log(err);
		});
	        else if(action === "favourite"){
	        	TwitInstance.post('favorites/create', { id: randomTweet.id_str }, function(err,data) {
			if(!err) {
				console.log(data);
			}
			else
			console.log(err);
		});

	        }
   }
   else {
   	console.log(err);
   }
});
};

function randIndex (arr) {
  var index = Math.floor(arr.length*Math.random());
  return arr[index];
};

Retweet_Favourite('retweet');
setInterval(Retweet_Favourite.bind(null,'retweet'),3000);
setInterval(Retweet_Favourite.bind(null,'favourite'),3000);
Retweet_Favourite('favourite');
