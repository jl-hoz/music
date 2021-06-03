import React, { useState, useEffect } from "react";
import axios from "axios";

const Album = (props) => {

  const [album, setAlbum] = useState(null);
  let selalbum  = props.album;
  let query = `https://ws.audioscrobbler.com/2.0/?method=album.getInfo&api_key=2a740d97172bba9499d0789532949e0a&artist=${selalbum?.artist}&album=${selalbum?.name}&format=json`;

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

  return (
    <div>
      {album && selalbum? <p>Album: {album.name} / Artist: {album.artist}</p> : null}
    </div>
  );
}

export default Album;
