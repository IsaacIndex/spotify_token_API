
var request = require('request'); // "Request" library

module.exports = {
    fetch_authorization : function(id, secret) {
        var client_id = id; // Your client id
        var client_secret = secret; // Your secret
        
        // your application requests authorization
        var authOptions = {
          url: 'https://accounts.spotify.com/api/token',
          headers: {
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
          },
          form: {
            grant_type: 'client_credentials'
          },
          json: true
        };
        
        
        request.post(authOptions, function(error, response, body) {
          if (!error && response.statusCode === 200) {
              console.log('Success!')
              console.log(typeof(body.access_token))
            // return body.access_token
            // use the access token to access the Spotify Web API
            var token = body.access_token;
            console.log(token)
            var options = {
                url: 'https://api.spotify.com/v1/users/jmperezperez',
              headers: {
                'Authorization': 'Bearer ' + token
              },
              json: true
            };
            request.get(options, function(error, response, body) {
              console.log(body);
            });
          } else {
              console.log(error)
              return "error"
          }
        });
    }
}