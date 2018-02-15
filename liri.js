// add required packages to project and import keys.js file
require("dotenv").config();
var keys = require("./keys.js");

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// function to get tweets from Twitter
function getTweets() {

  // use statuses/user_timeline endpoint to connect to Twitter API

  client.get("statuses/user_timeline", {screen_name: "rmglennon"}, function(error, tweets, response) {

    if (error) {
      throw error;
    }

    // return 20 most recent tweets and timestamp
    for (var i = 0; i < 20; i++) {
      console.log("Tweet " + (i + 1) + ": " + tweets[i].text);
      console.log("Timestamp: " + tweets[i].created_at);
    };
  });
};

// function to get song information from Spotify
function spotifySong() {

  // TODO: This is hard-coded
    // TODO: if there is no arg, default to song
  var songQuery = "never gonna give you up";

  // use tracks endpoints to search for songs on Spotify
  spotify.search({ type: "track", query: songQuery },

  function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    var songName = data.tracks.items[0].name;
    var artist = data.tracks.items[0].artists[0].name;
    var album = data.tracks.items[0].album.name;
    var previewURL = data.tracks.items[0].preview_url;

    // print information about the song

    // add statements to check because not all songs or information is found, and not all songs are available to preview on Spotify. If that happens, the search results can return null or undefined values.
    if (songName) {
      console.log("Song: " + songName);
    }
    else {
      console.log("Cannot find that song. Try another one.");
    }

    if (artist) {
      console.log("Artist: " + artist);
    }
    if (album) {
      console.log("Album: " + album);
    }
    if (previewURL) {
      console.log("Preview on Spotify: " + previewURL);
    }
  });
}

//getTweets();
//spotifySong();
