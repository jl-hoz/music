# What is this?

This is a react application that can search for songs, albums or artists. The results will be paged every 20 results. If you click in any result you will have a deep view of the element, no matter is an artist, song or album. It uses css flex-box for a better UI.

# Configuration file: .env

You have to create an environment file (.env) in the root directory of the repository. In this file you have to enter your secret keys of the APIs called in this project. The secret tokens below are not real, you have to generate your own.

``` sh
REACT_APP_LASTFM=XXXX
REACT_APP_GENIUS=XXXX
```

# Launch

``` sh
npm install
touch .env # create file
vi .env # enter your tokens as said in configuration file section
npm start
```
