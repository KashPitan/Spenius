import React, { Fragment, useContext } from "react";
import Context from "../Context/Context";

//Component/Page imports
import NowPlaying from "../Components/NowPlaying";
import SavedLyrics from "../Components/SavedLyrics";
import Lyrics from "../Components/Lyrics";

const Main = ({
  geniusUrl,
  nowPlaying,
  isSongPlaying,
  nowPlaying2,
  lyrics,
}) => {
  const context = useContext(Context);

  return (
    <Fragment>
      <div className="container">
        <div className="nowPlaying-savedLyrics">
          <NowPlaying
            geniusUrl={geniusUrl}
            nowPlaying={nowPlaying}
            isPlaying={isSongPlaying}
          />
          <div id="savedLyricsDiv">
            <h1>Saved Lyrics</h1>
            <hr></hr>
            <div className="savedLyrics2">
              <SavedLyrics />
            </div>
          </div>
          <button
            id="saveLyricsButton"
            onClick={() => context.saveLyrics(nowPlaying2.current)}
          >
            Save Lyrics
          </button>
          {context.noneSelectedAlert && <p>Text selection cannot be empty!</p>}
        </div>

        <Lyrics lyrics={lyrics} />
      </div>
    </Fragment>
  );
};
export default Main;
