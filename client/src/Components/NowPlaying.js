import React from "react";

const NowPlaying = ({ nowPlaying }) => {
  return (
    <>
      <div className="nowPlaying">
        <div className="nowPlayingImage">
          <img src={nowPlaying.albumArt} style={{ height: 150 }} />
        </div>

        <div className="nowPlayingText">
          <p>
            <strong>{nowPlaying.name}</strong>
          </p>
          <p>By: {nowPlaying.artist}</p>
          <p>Album: {nowPlaying.album}</p>
        </div>
      </div>
    </>
  );
};

export default NowPlaying;
