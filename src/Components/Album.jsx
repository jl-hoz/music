import React, { useState, useEffect } from "react";
import axios from "axios";

const Album = (props) => {

  const [album, setAlbum] = useState(null);
  let selalbum  = props.album;
  let query = `https://ws.audioscrobbler.com/2.0/?method=album.getInfo&api_key=${process.env.REACT_APP_LASTFM}&artist=${selalbum?.artist}&album=${selalbum?.name}&format=json`;

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(query);
      console.log(data.album)
      if(data.album){
        setAlbum(data.album);
      }
    }
    fetchData();
  }, [selalbum]);

  let data;

  if(album){
    let image = album.image.find(image => image.size === "extralarge");
    data = <div>
      <img src={image["#text"]} alt="album cover not available in last.fm" />
      <h2>{album.name}</h2>
      <p>{album.artist}</p>
      <p>Data adden in: {album.wiki?.published}</p>
      <p>{album.wiki?.summary}</p>
      <ol>
        {album.tracks.track.map(song => <li>{song.name} / {Math.trunc(song.duration / 60)}min {song.duration % 60}s</li>)}
      </ol>
    </div>
  }

  return (
    <div>
      {album && selalbum ? data : null}
    </div>
  );
}

export default Album;
