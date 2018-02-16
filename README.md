# Access APIs in a Node console app

LIRI, a _Language Interpretation and Recognition Interface_, is a command-line Node.js app. Following the usage guidelines, you can input a command and receive results back from the APIs of [Twitter](https://twitter.com), [Spotify](https://spotify.com), or [OMDb](http://www.omdbapi.com/).

## Set up and installation

You need to use your own API keys for [Twitter](https://apps.twitter.com/) and [Spotify](https://developer.spotify.com). Sign up and then paste them into the proper locations in the `.env` file for this app. 

Optionally, sign up for an [OMDb](http://www.omdbapi.com/) API key and replace it in the request in `liri.js`.

## Usage 

In a terminal window, navigate into the folder where you downloaded this app and use any of these commands:

- `my-tweets` to return the 20 most recent tweets from [@rmglennon](https://twitter.com/rmglennon) with a timestamp.
- `spotify-this-song` and an optional `"song title"`, in quotation marks, to search the Spotify API and return information about a song. 
- `movie-this` and an optional `"movie title"`, in quotation marks, to search the OMDb API and return information about a movie.
- `do-what-it-says` to read the contents of a text file (`random.txt`) and run a LIRI command. You can edit the text file to use any of the previous commands.

When optional parameters are not included, a default song or movie is returned.

**Example:**

`$ node liri.js spotify-this-song "shape of you"
Artist: Ed Sheeran
Song: Shape of You
Album: Shape of You
Preview on Spotify: https://p.scdn.co/mp3-preview/84462d8e1e4d0f9e5ccd06f0da390f65843774a2?cid=3bcfb1275778497cacae30e40bda8d33`
  
## Technology

- JavaScript
- Node.js and npm