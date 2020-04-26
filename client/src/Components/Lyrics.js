import React from "react";

const Lyrics = ({ lyrics }) => {
  return (
    <>
      <div className="lyrics-container">
        <div className="lyrics">
          <h1>Lyrics</h1>
          <hr></hr>
          <p id="lyrics-text">{lyrics}</p>
        </div>
      </div>
    </>
  );
};

export default Lyrics;
