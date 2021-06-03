import React, { useState, useEffect } from "react";
import axios from "axios";

const Artist = (props) => {

  const [artist, setArtist] = useState(null);
  const [topAlbums, setTopAlbums] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  let selartist  = props.artist;
  let query = `https://ws.audioscrobbler.com/2.0/?method=artist.getInfo&api_key=2a740d97172bba9499d0789532949e0a&artist=${selartist?.name}&format=json`;
  let queryTopAlbums = `https://ws.audioscrobbler.com/2.0/?method=artist.getTopAlbums&api_key=2a740d97172bba9499d0789532949e0a&artist=${selartist?.name}&format=json`;
  let queryTopSongs = `https://ws.audioscrobbler.com/2.0/?method=artist.getTopTracks&api_key=2a740d97172bba9499d0789532949e0a&artist=${selartist?.name}&format=json`;

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
    data = <div>
      <h2>{artist.name}</h2>
      <p>Tags: {artist.tags.tag.map(tag => <span>{tag.name} </span>)}</p>
      <h3>Top Album</h3>
      {topAlbums.length > 5 ? topAlbums.slice(0, 5).map(album => <p>{album.name}</p>) : topAlbums.map(album => <p>{album.name}</p>)}
      <h3>Top Songs</h3>
      {topSongs.length > 5 ? topSongs.slice(0, 5).map(song => <p>{song.name}</p>) : topSongs.map(song => <p>{song.name}</p>)}
      <h3>Similar artists</h3>
      {artist.similar.artist.map(artist => <p>{artist.name}</p>)}
      <h3>Biography</h3>
      <p>{artist.bio.summary}</p>
    </div>;
  }

  return (
    <div>
      {artist && selartist ? data : null}
    </div>
  );
}

export default Artist;
