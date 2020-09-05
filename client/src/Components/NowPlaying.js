import React, { useEffect } from "react";

const NowPlaying = ({ nowPlaying, isPlaying, geniusUrl }) => {
  // const getSong
  useEffect(() => {
    // nowPlayingUpdateLoop();
  }, []);
  return (
    <>
      {isPlaying ? (
        <div className="nowPlaying">
          <div id="nowPlayingSongInfo">
            <div className="nowPlayingImage">
              <img src={nowPlaying.albumArt} />
            </div>

            <div className="nowPlayingText">
              <p id="currentTitle">
                <strong>{nowPlaying.name}</strong>
              </p>
              <p id="currentArtist">By: {nowPlaying.artist}</p>
              <p id="currentAlbum">Album: {nowPlaying.album}</p>
              <button id="geniusLinkButton">
                <a href={geniusUrl} target="_blank">
                  See Lyrics on Genius
                </a>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="nowPlaying">
          <p id="nonePlayingText">
            Song will display here when playing <br /> (You may need to
            reconnect)
          </p>
        </div>
      )}
    </>
  );
};

export default NowPlaying;
