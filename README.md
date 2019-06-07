# LIRI-Bot
Command line Language Interpretation and Recognition Interface

## Video Walkthrough
[Click Me!](https://drive.google.com/file/d/1HS6KI52Xbx5Cvjm9vqSX4A3Cn8in6IwA/view?usp=sharing :target="_blank")

## Getting Setup
In order for you to use this application you must first have [node.js](https://nodejs.org/en/download/) installed onto your computer. Once that is installed clone this repository onto your local system. Navigate to where you installed Liri-Bot onto your system using the command prompt/terminal and type: _npm install_ to install the required npm packages. You are ready to use Liri-Bot at this point. Keep reading to see what the different prompts are in order to use this application. 

## Prompts
every prompt using this application must start off with: _node liri.js_ followed by one these arguments.
- help - to view a list of all the prompts and a brief description of what they return
- concert-this <artist name> - returns a list of upcoming live shows for that artist
- spotify-this-song <song name> - displays information and a link to the song
- movie-this <movie name> - shows cast and info about the movie
- do-what-it-says - Reads a .txt and returns info based on its data

## Built With
- axios
- node.js
- dotenv
- node-spotify-api
- omdb api
- bands in town api
- moment

_This application was created as an assignent for a coding bootcamp. Its purpose was to use npm to manipulate json data using node_
