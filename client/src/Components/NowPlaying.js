import React from "react";

const NowPlaying = ({ nowPlaying }) => {
  return (
    <div>
      <p>Now Playing: {nowPlaying.name}</p>
      <p>By: {nowPlaying.artist}</p>

      <div>
        <img src={nowPlaying.albumArt} style={{ height: 150 }} />
      </div>
    </div>
  );
};

export default NowPlaying;
