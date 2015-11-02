var Todo = require('./models/todo');
var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId : '3a5a42b52aa7438a8f78b89713da24db',
  clientSecret : 'c93fdedb8d3d4a8ba7830a9e7121e754',
  redirectUri : 'http://localhost:8080/api/todos'
});

module.exports = function(app) {
	var id = {};
	app.post('/api/todos', function(req, res) {

		spotifyApi.searchArtists(req.body.artistName)
		  .then(function(data) {
		    console.log(data.body.artists.items[0].id);

		    for (var i = 0; i < data.body.artists.items.length; i++) {
		    	id = data.body.artists.items[i].id;

		    	spotifyApi.getArtistTopTracks(id, req.body.country)
				  .then(function(data) {
				    console.log(data.body);
					res.json(data.body.tracks);		
				    }, function(err) {
				    console.log('Something went wrong!', err);
				  });
		    };

		    

		  }, function(err) {
		    console.log('Something went wrong!', err);
		  });
	});
	
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
};