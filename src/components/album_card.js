import React from "react";
import axios from "axios";

import { GET_ALBUMS } from "../constants";

import "../scss/albumcard.scss";

const AlbumCard = ({ title, img, id, getTracklist }) => {
  const getTrackData = () => {
    axios.get(GET_ALBUMS + id + "/tracks").then((trackData) => {
      getTracklist(trackData.data.data);
    });
  };

  return (
    <div className="cardContainer">
      <div className="imageContainer">
        <img src={img} alt="album cover art" />
      </div>

      <div className="titleContainer">
        <h2>{title.length > 30 ? `${title.substring(0, 30)}...` : title}</h2>
      </div>
      <button onClick={getTrackData}>see tracklist</button>
    </div>
  );
};

export default AlbumCard;
