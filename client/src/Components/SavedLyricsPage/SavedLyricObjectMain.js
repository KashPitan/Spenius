import React from "react";
import PropTypes from "prop-types";
import "../../Styles/SavedLyricsStyles.css";

const SavedLyricObjectMain = ({
  savedLyricObject: { lyrics, album, artist, song, albumArt },
}) => {
  return (
    <>
      <div className="savedLyricObjectMain">
        <div className="savedLyricObjectMainImage">
          <img src={albumArt} style={{ height: 100 }} />
        </div>
        <div className="savedLyricContent">
          <em>"{lyrics}"</em>
          {/* <br></br> */}
          <p>
            "{song}" from "{album}" by {artist}
          </p>
        </div>
      </div>
      <hr></hr>
    </>
  );
};

SavedLyricObjectMain.propTypes = {
  savedLyricObject: PropTypes.object.isRequired,
};
export default SavedLyricObjectMain;
