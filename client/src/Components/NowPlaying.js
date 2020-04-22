import React from "react";

const NowPlaying = ({ nowPlaying }) => {
  return (
    <div>
      <p>
        <strong>{nowPlaying.name}</strong>
      </p>
      <p>By: {nowPlaying.artist}</p>
      <p>Album: {nowPlaying.album}</p>

      <div>
        <img src={nowPlaying.albumArt} style={{ height: 150 }} />
      </div>
    </div>
  );
};

export default NowPlaying;
