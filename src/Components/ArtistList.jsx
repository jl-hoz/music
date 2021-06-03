import React, { useState, useEffect } from "react";
import axios from "axios";
import Artist from "./Artist";
import Pagination from "./Pagination";

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
      if (data.results) {
        setArtists(data.results.artistmatches.artist);
      }
    }
    fetchData();
  }, [search]);

  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage, setSongsPerPage] = useState(20);
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = artists?.slice(indexOfFirstSong, indexOfLastSong);
  const paginate = pageNumber => setCurrentPage(pageNumber);



  return (
    <div>
      {artists !== undefined && artists && selectedArtist === null ? currentSongs.map(artist => {
        return <p key={artist.url}><a style={{ color: "blue" }} onClick={() => setSelectedArtist(artist)}>{artist.name}</a> {artist.artist}</p>;
      }) : null}
      {artists !== undefined && artists && currentSongs ? <Pagination
        postsPerPage={songsPerPage}
        totalPosts={artists.length}
        paginate={paginate}
      /> : null}


      {selectedArtist !== null ? <Artist artist={selectedArtist} /> : null}
      {console.log(selectedArtist)}
    </div>
  );
}

export default ArtistList;
