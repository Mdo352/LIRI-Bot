// require("dotenv").config();
var fs = require('fs');
// var keys = require("./keys.js");
var axios = require("axios");
// var spotify = new spotify(keys.spotify);

var action = process.argv[2];
// var value = process.argv[3];
var value = (process.argv.slice(3)).join("+");
console.log(value);

function concert(){
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp&date=upcoming")
    .then(
        function(response) {
            for(i=0; i < response.data.length; i++){
                console.log('---------------------------------')
                console.log("Venue Name: "+response.data[i].venue.name+
                "\nLocation: "+response.data[i].venue.city + ", " + response.data[i].venue.region +' '+ response.data[i].venue.country+
                "\nDate: "+response.data[i].datetime +"\n");
            }
        }
    );
};
    
function spotify(){
    console.log('spotify a song')
};
    
function movie(){
    value = (process.argv.slice(3)).join("+");
    console.log(value);
    if (value === null || value === undefined || value === ""){

        axios.get("http://www.omdbapi.com/?t=Mr.+Nobody=&plot=short&apikey=trilogy").then(
            function(response) {
                    var response = response.data
                    console.log("\n----------------------------------------------------------------")
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
                    console.log("\n----------------------------------------------------------------")
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
    console.log('read .txt file')
};

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
};
