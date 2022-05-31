import React, { useEffect, useState } from "react";
import axios from "axios";

import { ARTIST_ALBUM, ARTIST_API } from "../constants";

import AlbumCard from "../components/album_card";

import "../scss/home.scss";

export default function Home() {
  const [artistId, setArtistId] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [artistData, setArtistData] = useState(undefined);
  const [albumData, setAlbumData] = useState([]);
  const [trackList, setTracklist] = useState([]);

  console.log(trackList);

  useEffect(() => {
    if (artistId === undefined) return;

    axios.get(ARTIST_ALBUM + artistId + "/albums").then((albums) => {
      setAlbumData(albums.data.data);
    });
  }, [artistId]);

  return (
    <div className="mainDiv">
      <div className="searchDiv">
        <form
          className="form"
          onSubmit={(e) =>
            axios.get(ARTIST_API + searchQuery).then((data) => {
              setArtistId(data.data.data[0].id);
              setArtistData(data.data.data[0]);
              e.preventDefault();
            })
          }
        >
          <input
            type="text"
            className="searchInput"
            placeholder="Search here"
            autoComplete="true"
            onChange={(input) => {
              setSearchQuery(input.target.value);
            }}
          />
        </form>
        <button
          className="submitButton"
          onClick={(e) =>
            axios.get(ARTIST_API + searchQuery).then((data) => {
              setArtistId(data.data.data[0].id);
              setArtistData(data.data.data[0]);
              e.preventDefault();
            })
          }
        >
          Search
        </button>
      </div>

      <div className="queryResult">
        {searchQuery === "" ? (
          <h2>Search results for</h2>
        ) : (
          <h2>Search results for "{searchQuery}"</h2>
        )}
      </div>
      <div>
        <h2 className="albumTitle">ALBUMS</h2>
      </div>
      <div className="albumsList">
        {albumData !== undefined ? (
          albumData.map((value, index) => {
            return (
              <AlbumCard
                title={value.title}
                key={index}
                img={value.cover_medium}
                id={value.id}
                getTracklist={setTracklist}
              />
            );
          })
        ) : (
          <p> please search an artist </p>
        )}
      </div>
      <span className="underline"></span>

      <div className="albumSpecific"></div>
    </div>
  );
}
