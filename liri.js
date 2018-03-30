require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");
var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);



//my-tweets
if (process.argv[2] == "twitter-feed") {
	client.get('statuses/user_timeline', {q: 'node.js', count: 20, screen_name: 'Eat_Pray_Code'}, function(error, tweets, response) {
	  if (error) {
        console.log(error);
      } 
	   for (var i = 0; i < tweets.length; i++) {
         var myTweets = ("Date: " + tweets[i].created_at + "Tweet: " + tweets[i].text + "\n");
		   console.log(myTweets); 	
	  }
  });
}


//spotify-this-song
if (process.argv[2] == "spotify-this-song" && process.argv[3] !== undefined) {
	spotify.search({ type: 'track', query: process.argv[3]}, function(err, data) {
	    if (err) {
          console.log(err);
        }
        var mySpotify = ("\nArtist: " + data.tracks.items[0].album.artists[0].name + "\nThe Song's Name: " + data.tracks.items[0].name + "\nThe Preview Link: " + data.tracks.items[0].preview_url + "\nThe Album this song is from: " + data.tracks.items[0].album.name + "\n");
		console.log(mySpotify); 	  
    });
   }
   else if (process.argv[2] == "spotify-this-song" && process.argv[3] == undefined) {
	spotify.search({ type: 'track', query: 'soy+yo'}, function(err, data) {
	    if (err) {
          console.log(err);
        }
        var mySpotify = ("\nArtist: " + data.tracks.items[0].album.artists[0].name + "\nThe Song's Name: " + data.tracks.items[0].name + "\nThe Preview Link: " + data.tracks.items[0].preview_url + "\nThe Album this song is from: " + data.tracks.items[0].album.name + "\n");
		console.log(mySpotify); 	  
    });
 }

//movie-this
if (process.argv[2] == "movie-this") {
    var movieName = process.argv[3];
    if (movieName !== undefined) {
	    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        request(queryUrl, function(error, response, body) {
            if (!error && response.statusCode === 200) {
            var myMovie = ("\nMovie Title: " + JSON.parse(body).Title + "\nRelease Year: " + JSON.parse(body).Year + "\nMovie Rating: " + JSON.parse(body).Rated + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\nCountry: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\n");
		    console.log(myMovie); 	  
         };
      });
    }
    else {
    	var queryUrl = "http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy";
        request(queryUrl, function(error, response, body) {
            if (!error && response.statusCode === 200) {
            var myMovie = ("\nMovie Title: " + JSON.parse(body).Title + "\nRelease Year: " + JSON.parse(body).Year + "\nMovie Rating: " + JSON.parse(body).Rated + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\nCountry: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\n");
		    console.log(myMovie); 	  
          };
      });
    }
}



//do-what-it-says
if (process.argv[2] == "do-what-it-says") {

  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    var random = data.split(",");

	spotify.search({ type: 'track', query: random[1]}, function(err, data) {
	    if (err) {
          console.log(err);
        }
        var mySpotify = ("\nArtist: " + data.tracks.items[0].album.artists[0].name + "\nThe Song's Name: " + data.tracks.items[0].name + "\nThe Preview Link: " + data.tracks.items[0].preview_url + "\nThe Album this song is from: " + data.tracks.items[0].album.name + "\n");
		console.log(mySpotify); 
     });
    });
}