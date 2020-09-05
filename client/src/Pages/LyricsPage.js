import React, { Fragment, useContext } from "react";
import SavedLyricsMain from "./SavedLyricsPage/SavedLyricsMain";
import Context from "../Context/Context";

const LyricsPage = () => {
  const context = new useContext(Context);

  return (
    <Fragment>
      <div className="container2">
        <div id="lyricsPageTitle">
          <h1>Saved Lyrics</h1>
          <hr></hr>
        </div>
        <SavedLyricsMain />
        <button onClick={() => context.clearLyrics()}>Clear Lyrics</button>
      </div>
    </Fragment>
  );
};
export default LyricsPage;
