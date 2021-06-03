import React, { useState, useEffect } from "react";
import axios from "axios";
import Song from "./Song";
import Pagination from "./Pagination";

const SongList = (props) => {

  const [songs, setSongs] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  let search = props.search;
  let query = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${search}&api_key=${process.env.REACT_APP_LASTFM}&format=json`;


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

  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage, setSongsPerPage] = useState(20);
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = songs?.slice(indexOfFirstSong, indexOfLastSong);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
    { songs !== undefined && songs && currentSongs? currentSongs.map(song => {
      return <p key={song.url}><a style={{color: "blue"}} onClick={() => setSelectedSong(song)}>{song.name}</a> {song.artist}</p>;
    }) : null}
      {console.log(selectedSong) }
      {songs !== undefined && songs && currentSongs? <Pagination
        postsPerPage={songsPerPage}
        totalPosts={songs.length}
        paginate={paginate}
       /> : null}

      {selectedSong !== null ? <Song song={selectedSong}/> : null}
    </div>
  );
}

export default SongList;
