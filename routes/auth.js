
/*
 * GET users listing.
 */


var http = require("http");
var https = require("https");
var querystring = require('querystring');
var request = require("request");
var redis = require("redis");
var client = redis.createClient();
var OAuth = require('OAuth');

exports.get_authorization = function(req, final_response, callback){
  //final_response.redirect('https://www.strava.com/oauth/authorize?client_id=1437&response_type=code&redirect_uri=http://localhost:3000/auth&scope=write');
  client.get("authtoken:shawn", function(err, reply) {
    console.log(err);
    console.log(reply);

    callback(reply);
  });
}

exports.authorize = function(req, final_response) {
  client.get("authtoken:shawn", function(err, reply) {    
    if (reply)
    {
      return reply;
    }
    else
    {
      return authorize(req);
    }
  });

  final_response.redirect('http://localhost:3000/api/profile');
}

function authorize(req) {
  var post_data = querystring.stringify({
    'client_id': '1437',
    'client_secret': 'facb7d21e57fb000af2ef34ef8ef114d1542e761',
    'code': req.query.code
  });

  var oauth_options = {
    url: 'https://www.strava.com/oauth/token',
    body: post_data
  }

  request.post(oauth_options, function(error, response, body) {
    var json = JSON.parse(body);
    var token = json.access_token;
    console.log('TOKEN: ' + token);
    client.set("authtoken:shawn", token);
    return token;
  });
}
