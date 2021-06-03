import React, { useState, useEffect } from "react";
import axios from "axios";
import Album from "./Album";

const AlbumList = (props) => {

  const [albums, setAlbums] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  let search = props.search;
  let query = `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${search}&api_key=2a740d97172bba9499d0789532949e0a&format=json`;

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(query);
      //setData(data);
      console.log(data)
      if(data.results){
        setAlbums(data.results.albummatches.album);
      }
    }
    fetchData();
  }, [search]);

  return (
    <div>
    { albums !== undefined && albums ? albums.map(album => {
      return <p key={album.url}><a style={{color: "blue"}} onClick={() => setSelectedAlbum(album)}>{album.name}</a> {album.artist}</p>;
    }) : null}
      {selectedAlbum !== null ? <Album album={selectedAlbum}/> : null}
      {console.log(selectedAlbum) }
    </div>
  );
}

export default AlbumList;
