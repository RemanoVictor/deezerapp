import React from "react";

const Suggestions = ({ results }) => {
  const options = results.map((data) => <li key={data.index}>{data.name}</li>);
  return <ul className="suggestions">{options}</ul>;
};

export default Suggestions;
