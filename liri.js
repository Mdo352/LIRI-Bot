require("dotenv").config();
var fs = require('fs');
// var keys = require("./keys.js");
// var spotify = new spotify(keys.spotify);
var axios = require("axios");
var moment = require('moment');
var Spotify = require('node-spotify-api');

var artistList = [];
var action = process.argv[2];
var value = (process.argv.slice(3)).join("+");
var spotifyValue = (process.argv.slice(3)).join(" ");

function concert(){
    console.log('Searching for '+spotifyValue+' concerts...\n\n');

    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp&date=upcoming")
    .then(
        function(response) {
            for(i=0; i < response.data.length; i++){
                console.log("---------------------------------\nVenue Name: "+response.data[i].venue.name+
                "\nLocation: "+response.data[i].venue.city + ", " + response.data[i].venue.region +' '+ response.data[i].venue.country+
                "\nDate: "+ moment(response.data[i].datetime).format('LLL')+"\n");
            }
        }
    );
};
    
function spotify(){

    console.log('Searching for song: '+spotifyValue+'...\n\n');
 
    var spotify = new Spotify({
        id: '*****redacted*****',
        secret: '*****redacted*****'
    });
 
    if ( spotifyValue === null || spotifyValue === undefined || spotifyValue === ""){
        spotify
            .search({ type: 'track', query: 'The Sign, Ace of Base', limit: 1 })
            .then(function(response) {
                res = response.tracks.items[0];
                function artistsArray (){
                    for(i=0; i<res.artists.length; i++){
                        artistList.push(res.artists[i].name);
                    }
                }
            artistsArray();
            // console.log(res);
            console.log('NO SONG WAS ENTERED, PLEASE ENJOY THIS CLASSIC...\n------------------------')
            console.log('Song Name: '+res.name+'\nArtists: '+artistList+
            "\nAlbum: "+ (res.album.name) + "\nPreview Link: "+res.preview_url );
    })
    .catch(function(err) {
        console.error(err);
    });
    }else{
        spotify
            .search({ type: 'track', query: spotifyValue, limit: 1 })
            .then(function(response) {
                res = response.tracks.items[0];
                function artistsArray (){
                    for(i=0; i<res.artists.length; i++){
                        artistList.push(res.artists[i].name);
                    }
                }
                
            // console.log( response );
            // console.log(res);
            artistsArray();
            console.log('------------------------')
            console.log('Song Name: '+res.name+'\nArtists: '+artistList+
            "\nAlbum: "+ (res.album.name) + "\nPreview Link: "+res.preview_url);
            })
            .catch(function(err) {
                console.error(err);
            });
    }
                
};
    
function movie(){
    console.log('Searching for movie: '+spotifyValue+'...\n\n');

    if (value === null || value === undefined || value === ""){

        axios.get("http://www.omdbapi.com/?t=Mr.+Nobody=&plot=short&apikey=trilogy").then(
            function(response) {
                    var response = response.data
                    // console.log(response);
                    console.log("NO MOVIE WAS ENTERED, HERE IS ONE OF MY FAVS\n----------------------------------------------------------------")
                    console.log("Title: " + response.Title+ "\nYear: " + response.Year +
                    "\nIMDB Rating: "+response.Ratings[0].Value+"\nRotten Tomatoes Rating: "
                    +response.Ratings[1].Value +"\nCountry: "+ response.Country
                    +"\nLanguage: "+response.Language+"\nPlot: "+response.Plot
                    +"\nActors: "+response.Actors+"\n----------------------------------------------------------------\n");
            }
        );
    }else{
        axios.get("http://www.omdbapi.com/?t="+value+"&y=&plot=short&apikey=trilogy").then(
        function(response) {
                    var response = response.data
                    console.log("----------------------------------------------------------------")
                    console.log("Title: " + response.Title+ "\nYear: " + response.Year +
                    "\nIMDB Rating: "+response.Ratings[0].Value+"\nRotten Tomatoes Rating: "
                    +response.Ratings[1].Value +"\nCountry: "+ response.Country
                    +"\nLanguage: "+response.Language+"\nPlot: "+response.Plot
                    +"\nActors: "+response.Actors+"\n----------------------------------------------------------------\n");
            }
        );
    };
};

function simonSays(){
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.error(error);
        }
        var dataArr = data.split(",");

        if(dataArr[0] == 'spotify-this-song'){
            spotifyValue = dataArr[1];
            spotify();
        }       
      
      });
      
};

function help(){
    console.log('Hi, I am Liri. A Virtual assitant for all things entertainment!! Just follow my my prompts listed below to get started\n\n concert-this <Any artistist name> - to find a list of upcoming live shows\n\n spotify-this-song <song name> - for song info(artist name not required)\n\n movie-this <movie title> - for movie information\n\n do-what-it-says - to find info about the song in the random.txt file')
}

switch (action){
    case 'concert-this':
        concert();
        break;

    case 'spotify-this-song':
        spotify();
        break;

    case 'movie-this':
        movie();
        break;

    case 'do-what-it-says':
        simonSays();
        break;

    case 'help':
        help();
        break;
        
    default:
        console.log("I did not get that, please try again!\nOr type 'help' for a list of my prompts");
        break;
};
