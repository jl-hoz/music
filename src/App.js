import './App.css';
import React, { useState } from "react";
import SongList from "./Components/SongList";
import AlbumList from "./Components/AlbumList";
import ArtistList from "./Components/ArtistList";
//import { useAxios } from "./use-axios";

const App = () => {

  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  const [isSong, setSong] = useState(true);
  const [isAlbum, setAlbum] = useState(false);
  const [isArtist, setArtist] = useState(false);
  const [firstSearch, setFirstSearch] = useState(false);
  let searchBuffer;

  const updateSearch = (e) => {
    searchBuffer = e.target.value;
  }

  const updateSongTag = () => {
    setSong(true);
    setAlbum(false);
    setArtist(false);
  }

  const updateAlbumTag = () => {
    setSong(false);
    setAlbum(true);
    setArtist(false);
  }

  const updateArtistTag = () => {
    setSong(false);
    setAlbum(false);
    setArtist(true);
  }

  const submitForm = (e) => {
    e.preventDefault();
    setFirstSearch(true);
    setSearch(searchBuffer);
    console.log(search, isSong, isAlbum, isArtist);
  }


  return (
    <div>
      <form onSubmit={submitForm}>
        <input type="text" name="searchbar" value={searchBuffer} onChange={updateSearch} placeholder="Search songs, albums or artists..." />

        <input type="radio" name="searchtag" checked={isSong} onChange={() => updateSongTag()} />
        <label>Song</label>

        <input type="radio" name="searchtag" checked={isAlbum} onChange={() => updateAlbumTag()} />
        <label>Album</label>

        <input type="radio" name="searchtag" checked={isArtist} onChange={() => updateArtistTag()} />
        <label>Artist</label>

        <button>Submit</button>
      </form>

      
      {isSong && setFirstSearch ? <SongList search={search} /> : null}
      {isAlbum && setFirstSearch ? <AlbumList search={search}/> : null}
      {isArtist && setFirstSearch ? <ArtistList search={search} /> : null}

      {console.log(data)}
    </div>
  );
}

export default App;
