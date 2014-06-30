var http = require("http");
var https = require("https");
var querystring = require('querystring');
var request = require("request");
var redis = require("redis");
var client = redis.createClient();
var OAuth = require('OAuth');
var auth = require('./auth');

exports.get = function(req, final_response)
{
  auth.get_authorization(req, final_response, function(token) {
    get_rides(token, final_response);
  });
}


function get_rides(token, final_response) {
  var access_token = querystring.stringify({'access_token' : token});

  var options = {
      host: 'www.strava.com',
      port: 443,
      path: '/api/v3/athlete/activities',
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
          // 'Content-Length': access_token.length
      },
      query: access_token
  };

  var port = options.port == 443 ? https : http;
  var stravaReq = port.request(options, function(res)
  {
      var output = '';
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
          output += chunk;
      });

      res.on('end', function() {
          console.log('FINAL OUTPUT: ' + output);
          var obj = JSON.parse(output);
          final_response.send(obj);
      });
  });

  stravaReq.on('error', function(err) {
      res.send('error: ' + err.message);
  });

  stravaReq.write(access_token);
  stravaReq.end();
}