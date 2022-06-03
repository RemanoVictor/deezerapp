import React from "react";
import axios from "axios";

import { GET_ALBUMS } from "../constants";

import "../scss/albumcard.scss";

const AlbumCard = ({ title, img, id, getAlbumData }) => {
  const getTrackData = () => {
    axios.get(GET_ALBUMS + id).then((trackData) => {
      getAlbumData(trackData.data);
    });
  };

  return (
    <div className="cardContainer">
      <div className="imageContainer">
        <img src={img} alt="album cover art" />
      </div>

      <div className="titleContainer">
        <button className="seeTracklist tooltip" onClick={getTrackData}>
          <h2>{title.length > 30 ? `${title.substring(0, 20)}...` : title}</h2>
          <span className="tooltiptext">{title}</span>
        </button>
      </div>
    </div>
  );
};

export default AlbumCard;
