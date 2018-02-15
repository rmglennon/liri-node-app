// add required packages to project and import keys.js file
require("dotenv").config();
var keys = require("./keys.js");
// var inquirer = require("inquirer");

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//TODO: make into switch case
//TODO: switch to inquirer to enable multiple words in searches
function chooseAppToRun() {
  if (process.argv[2] === "my-tweets") {
    getTweets();
  } else if (process.argv[2] === "spotify-this-song") {
    spotifySong();
  } else if (process.argv[2] === "movie-this") {
    getMovie();
  } else if (process.argv[2] === "do-what-it-says") {
    // TODO: write function
    console.log("TODO: Write this");
  }
  else {
    console.log("Usage is my-tweets, spotify-this-song, movie-this, or do-what-it-says");
  }
}

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

  // song to search is input argument
  var songQuery = process.argv[3];

  if (!songQuery) {
    songQuery = "Never Gonna Give You Up";
  }

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

// function to get movie information from OMDb
function getMovie() {

  // title to search is input argument
  var title = process.argv[3];

  if (!title) {
    title = "Groundhog Day";
  }

  // use request package to make a request to OMDb for the input title
  request("http://www.omdbapi.com/?t=" + title + "&apikey=trilogy", function(error, response, body) {

    // if no error and HTTP code 200, then parse movie information
    if (!error && response.statusCode === 200) {

      console.log("Title: " + JSON.parse(body).Title);
      console.log("Year of release: " + JSON.parse(body).Year);
      console.log("IMDb rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country of origin: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });

}

//getTweets();
//spotifySong();
//getMovie();
chooseAppToRun();
