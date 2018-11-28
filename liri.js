
var dotEnv = require('dotenv').config();
var axios = require("axios");
var Spotify = require('node-spotify-api');
var bandsintown = require('bandsintown')("codingbootcamp");
var moment = require('moment');
var keys = require('./keys');


var searchType = process.argv[2];
var searchItem = process.argv.slice(3).join(" ");
// console.log(searchType + " " + searchItem)

if(searchType == "concert-this"){
  // console.log("Venue searchItem = " + searchItem );

  var URL = "https://rest.bandsintown.com/artists/" + searchItem +"/events?app_id=codingbootcamp"
  axios.get(URL).then(
    function(response){
    console.log("Artist: " + searchItem);
    console.log("Venue: " + response.data[0].venue.name);
    console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.country);
    // console.log("Date: " + moment(response.data[0].datetime, 'MM/DD/YYYY');
    console.log("Date: " + moment(response.data[0].datetime).format('MM/DD/YYYY'));
    // console.log("Date: " + response.data[0].datetime);
  })
  .catch(function(err) {
    console.log("ERROR " + err);
  });

}
else if(searchType == "spotify-this-song"){
    // console.log("Song searchItem = " + searchItem );
    var spotify = new Spotify({
      id: "9e1d2293b29540a5aaecedca6ff2227b",
      secret: "0eec497245ed421390c52a8192c5f10e"
    });
  
    spotify
      .search({
          type: 'track',
          query: searchItem
        })
      .then(function(response) {
          // console.log(response)
  
          var songData = response.tracks.items[0];
          console.log("Artist: " + songData.artists[0].name);
          // console.log("Title: " + sondData.name);
          console.log("Preview URL: " + songData.preview_url);
          console.log("Album: " + songData.album.name);
  
      })
      .catch(function(err) {
        console.log("ERROR " + err);
      });
    }
else if(searchType == "movie-this"){
  // console.log("Movie searchItem = " + searchItem );
  var URL = "http://www.omdbapi.com/?t=" + searchItem +" &plot=short&apikey=trilogy";
axios.get(URL).then(
  function(response) {
    
    console.log("Tittle: " + response.data.Title);
    console.log("Year: " + response.data.Year);
    console.log("The movie's rating is: " + response.data.imdbRating);
  }
);

}
else if(searchType == "do-what-it-says"){
  console.log("do what searchItem = " + searchItem );
}
else{
  console.log("No parameters!")
}




 
