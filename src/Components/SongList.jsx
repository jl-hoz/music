import React, { useState, useEffect } from "react";
import axios from "axios";
import Song from "./Song";

const SongList = (props) => {

  const [songs, setSongs] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  let search = props.search;
  let query = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${search}&api_key=2a740d97172bba9499d0789532949e0a&format=json`;

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(query);
      //setData(data);
      console.log(data)
      if(data.results){
        setSongs(data.results.trackmatches.track);
      }
    }
    fetchData();
  }, [search]);

  return (
    <div>
    { songs !== undefined && songs ? songs.map(song => {
      return <p key={song.url}><a style={{color: "blue"}} onClick={() => setSelectedSong(song)}>{song.name}</a> {song.artist}</p>;
    }) : null}
      {selectedSong !== null ? <Song song={selectedSong}/> : null}
      {console.log(selectedSong) }
    </div>
  );
}

export default SongList;
