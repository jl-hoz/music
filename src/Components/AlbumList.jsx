import React, { useState, useEffect } from "react";
import axios from "axios";
import Album from "./Album";
import Pagination from "./Pagination";

const AlbumList = (props) => {

  const [albums, setAlbums] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  let search = props.search;
  let query = `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${search}&api_key=${process.env.REACT_APP_LASTFM}&format=json`;

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(query);
      //setData(data);
      console.log(data)
      if (data.results) {
        setAlbums(data.results.albummatches.album);
      }
    }
    fetchData();
  }, [search]);

  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage, setSongsPerPage] = useState(20);
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = albums?.slice(indexOfFirstSong, indexOfLastSong);
  const paginate = pageNumber => setCurrentPage(pageNumber);



  return (
    <div className={selectedAlbum === null ? "list" : ""}>
      {albums !== undefined && albums && selectedAlbum === null ? currentSongs.map(album => {
        return <p key={album.url}><a style={{ color: "blue" }} onClick={() => setSelectedAlbum(album)}>{album.name}</a> {album.artist}</p>;
      }) : null}
      {albums !== undefined && albums && currentSongs && selectedAlbum === null ? <Pagination
        postsPerPage={songsPerPage}
        totalPosts={albums.length}
        paginate={paginate}
      /> : null}



      {selectedAlbum !== null ? <Album album={selectedAlbum} /> : null}
      {console.log(selectedAlbum)}
    </div>
  );
}

export default AlbumList;
