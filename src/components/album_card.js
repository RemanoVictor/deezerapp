import React from "react";

const AlbumCard = (props) => {
  const { title, img } = props;

  return (
    <div>
      <div className="imageContainer">
        <img src={img} alt="album cover art" />
      </div>

      <div className="titleContainer">
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default AlbumCard;
