import React, { useEffect, useState } from "react";
import axios from "axios";

import { ARTIST_ALBUM, ARTIST_API } from "../constants";

import AlbumCard from "../components/album_card";

export default function Home() {
  const [artistId, setArtistId] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [artistData, setArtistData] = useState(undefined);
  const [albumData, setAlbumData] = useState([]);
  const [trackList, setTracklist] = useState([]);

  useEffect(() => {
    if (artistId === undefined) return;

    axios.get(ARTIST_ALBUM + artistId + "/albums").then((albums) => {
      //   console.log(albums.data.data);
      setAlbumData(albums.data.data);
    });
  }, [artistId]);

  //   const getData = (data) => {
  //     setTracklist(data);
  //     console.log(data);
  //   };

  console.log(trackList);

  return (
    <div className="mainDiv">
      <div className="searchDiv">
        <form>
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
          aria-label="button"
          onClick={(e) =>
            axios.get(ARTIST_API + searchQuery).then((data) => {
              setArtistId(data.data.data[0].id);
              setArtistData(data.data.data[0]);
              e.preventDefault();
            })
          }
        />

        {searchQuery === "" ? (
          <h2>Search results for</h2>
        ) : (
          <h2>Search results for "{searchQuery}"</h2>
        )}
      </div>

      <div className="albumsList">
        <h2>ALBUMS</h2>
        {albumData !== undefined ? (
          albumData.map((value, index) => {
            return (
              <AlbumCard
                title={value.title}
                key={index}
                img={value.cover_medium}
                id={value.id}
                sendTrackData={(trackList) => {
                  setTracklist(trackList);
                }}
              />
            );
          })
        ) : (
          <p> please search an artist </p>
        )}
      </div>

      <div className="albumSpecific">{}</div>
    </div>
  );
}
