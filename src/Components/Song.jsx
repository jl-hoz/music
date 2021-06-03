import React, { useState, useEffect } from "react";
import axios from "axios";

const Song = (props) => {

  const [song, setSong] = useState(null);
  let selsong  = props.song;
  let query = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.REACT_APP_LASTFM}&artist=${selsong?.artist}&track=${selsong?.name}&format=json`;
  let querySongLyrics = `https://api.genius.com/search?q=${selsong.name}`;

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(query);
      console.log(data)
      if(data.track){
        setSong(data.track);
      }
    }
    async function fetchLyrics() {
      const config = {
        headers: { Authorization: `Bearer ${process.env.REACT_APP_GENIUS}` }
      };

      const bodyParameters = {
        key: "value"
      };

      axios.post(
        querySongLyrics,
        bodyParameters,
        config
      ).then(console.log).catch(console.log);
    }
    fetchData();
  }, [selsong]);

  let data;

  if (song) {
    let image = song.album?.image.find(image => image.size === "extralarge");
    data = <div>
      <div className="song">
        <div className="song-header">
          <div>
            <h2>{song.name}</h2>
            <p>{song.album?.title}</p>
            <p>{song.artist.name}</p>
            <p>{Math.trunc(song.duration / 60000)}min {song.duration % 60}s</p>
            <p>Data adden in: {song.wiki?.published}</p>
          </div>
          {song.album ? <img src={image["#text"]} alt="album cover not available in last.fm" /> : null}
        </div>
        <div className="song-data">
          <p>{song.wiki?.summary}</p>
          <h2>Lyrics</h2>
          <p>Genius lyrics not available because of CORS policy :(</p>
        </div>
      </div>
    </div>
  }

  return (
    <div>
      {song && selsong ? data : null}
    </div>
  );
}

export default Song;
