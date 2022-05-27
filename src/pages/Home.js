import React, { useEffect, useState } from "react";
import axios from "axios";

import { ARTIST_API } from "../constants";
import { CORS_BYPASS } from "../constants";

import Search from "../media/images/search.png";
import AlbumCard from "../components/album_card";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [artistData, setArtistData] = useState(undefined);

  return (
    <div>
      <input
        type="text"
        className="searchInput"
        placeholder="please enter an artist"
        onChange={(input) => {
          axios.get(CORS_BYPASS + ARTIST_API + searchQuery).then((data) => {
            console.log(data.data.data);
            setArtistData(data.data.data);
          });
          setSearchQuery(input.target.value);
          console.log(input.target.value);
        }}
      />
      <img src={Search} alt="search icon" width="10px" height="10px" />

      <div>
        {/* {artistData
          .filter((artist) => {
            if (searchQuery === "") {
              return <p>please search</p>;
            } else if (
              artist.title.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
              return artist;
            }
          })
          .map((artist, index) => (
            <div className="box" key={index}>
              <p>{artist.title}</p>
              <p>{artist.author}</p>
            </div>
          ))} */}
      </div>
    </div>
  );
}
