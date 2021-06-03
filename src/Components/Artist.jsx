import React, { useState, useEffect } from "react";
import axios from "axios";

const Artist = (props) => {

  const [artist, setArtist] = useState(null);
  const [topAlbums, setTopAlbums] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  let selartist  = props.artist;
  let query = `https://ws.audioscrobbler.com/2.0/?method=artist.getInfo&api_key=${process.env.REACT_APP_LASTFM}&artist=${selartist?.name}&format=json`;
  let queryTopAlbums = `https://ws.audioscrobbler.com/2.0/?method=artist.getTopAlbums&api_key=${process.env.REACT_APP_LASTFM}&artist=${selartist?.name}&format=json`;
  let queryTopSongs = `https://ws.audioscrobbler.com/2.0/?method=artist.getTopTracks&api_key=${process.env.REACT_APP_LASTFM}&artist=${selartist?.name}&format=json`;

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(query);
      console.log(data.artist)
      if(data.artist){
        setArtist(data.artist);
      }
    }
    async function fetchAlbums() {
      const { data } = await axios.get(queryTopAlbums);
      console.log(data.topalbums.album)
      if(data.topalbums){
        setTopAlbums(data.topalbums.album);
      }
    }
    async function fetchSongs() {
      const { data } = await axios.get(queryTopSongs);
      console.log(data.toptracks.track)
      if(data.toptracks){
        setTopSongs(data.toptracks.track);
      }
    }
    fetchData();
    fetchAlbums();
    fetchSongs();
  }, [selartist]);

  let data;
  if (artist) {
    data = <div className="artist">
      <div className="artist-header">
        <h1>{artist.name}</h1>
        <p>Tags: {artist.tags.tag.map(tag => <span>{tag.name} </span>)}</p>
      </div>
      <div className="artist-top">
        <div className="artist-topAlbum">
          <h3>Top Album</h3>
          {topAlbums.length > 5 ? topAlbums.slice(0, 5).map(album => <p>{album.name}</p>) : topAlbums.map(album => <p>{album.name}</p>)}
        </div>
        <div className="artist-topSong">
          <h3>Top Songs</h3>
          {topSongs.length > 5 ? topSongs.slice(0, 5).map(song => <p>{song.name}</p>) : topSongs.map(song => <p>{song.name}</p>)}
        </div>
      </div>
      <div className="artist-misc-similar">
        <h3>Similar artists</h3>
        <p>{artist.similar.artist.map(artist => <span>{artist.name} | </span>)}</p>
      </div>
      <div className="artist-misc-bio">
        <h3>Biography</h3>
        <p>{artist.bio.summary}</p>
      </div>
    </div>;
  }

  return (
    <div>
      {artist && selartist ? data : null}
    </div>
  );
}

export default Artist;
