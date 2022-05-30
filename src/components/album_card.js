import React, { useState } from "react";
import axios from "axios";

import { GET_ALBUMS } from "../constants";

const AlbumCard = ({ title, img, id, getTracklist }) => {
  const [trackData, setTrackData] = useState([]);

  return (
    <div className="cardContainer">
      <div className="imageContainer">
        <img src={img} alt="album cover art" />
      </div>

      <div className="titleContainer">
        <h2>{title}</h2>
      </div>
      <button
        onClick={() => {
          getTracklist(
            axios.get(GET_ALBUMS + id + "/tracks").then((tracklist) => {
              setTrackData(tracklist.data.data);
              console.log(tracklist.data.data);
            })
          );
        }}
      >
        see tracklist
      </button>
    </div>
  );
};

export default AlbumCard;
