import React, { useState, useEffect } from "react";
import axios from "axios";
import Artist from "./Artist";

const ArtistList = (props) => {

  const [artists, setArtists] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  let search = props.search;
  let query = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${search}&api_key=${process.env.REACT_APP_LASTFM}&format=json`;

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(query);
      //setData(data);
      console.log(data)
      if(data.results){
        setArtists(data.results.artistmatches.artist);
      }
    }
    fetchData();
  }, [search]);

  return (
    <div>
    { artists !== undefined && artists && selectedArtist === null ? artists.map(artist => {
      return <p key={artist.url}><a style={{color: "blue"}} onClick={() => setSelectedArtist(artist)}>{artist.name}</a> {artist.artist}</p>;
    }) : null}
      {selectedArtist !== null ? <Artist artist={selectedArtist}/> : null}
      {console.log(selectedArtist) }
    </div>
  );
}

export default ArtistList;
