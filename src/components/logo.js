import React from "react";

const Logo = ({ src, width, height, alt, logoTitle }) => {
  return (
    <div className="logoContainer">
      <div>
        <img src={src} alt={alt} width={width} height={height} />
      </div>
      <h3 className="logoContainer_logoText">{logoTitle}</h3>
    </div>
  );
};

export default Logo;
