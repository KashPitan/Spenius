import React from "react";

const NowPlaying = ({ nowPlaying, isPlaying }) => {
  return (
    <>
      {isPlaying ? (
        <div className="nowPlaying">
          <div id="nowPlayingSongInfo">
            <div className="nowPlayingImage">
              <img src={nowPlaying.albumArt} style={{ height: 150 }} />
            </div>

            <div className="nowPlayingText">
              <p id="currentTitle">
                <strong>{nowPlaying.name}</strong>
              </p>
              <p id="currentArtist">By: {nowPlaying.artist}</p>
              <p id="currentAlbum">Album: {nowPlaying.album}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="nowPlaying">
          <p id="nonePlayingText">Song will display here when playing</p>
        </div>
      )}
    </>
  );
};

export default NowPlaying;
