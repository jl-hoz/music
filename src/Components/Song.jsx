import React, { useState, useEffect } from "react";
import axios from "axios";

const Song = (props) => {

  const [song, setSong] = useState(null);
  let selsong  = props.song;
  let query = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.REACT_APP_LASTFM}&artist=${selsong?.artist}&track=${selsong?.name}&format=json`;

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(query);
      console.log(data)
      if(data.track){
        setSong(data.track);
      }
    }
    fetchData();
  }, [selsong]);

  return (
    <div>
      {song && selsong? <p>Song: {song.name} / Artist: {song.artist.name} / Album: {song.album.title}</p> : null}
    </div>
  );
}

export default Song;
