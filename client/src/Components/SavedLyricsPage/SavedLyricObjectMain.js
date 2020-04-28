import React, { useContext } from "react";
import PropTypes from "prop-types";
import "../../Styles/SavedLyricsStyles.css";
import Context from "../../Context/Context";

const SavedLyricObjectMain = ({
  savedLyricObject: { lyrics, album, artist, song, albumArt, id },
}) => {
  const context = useContext(Context);

  return (
    <>
      <div className="savedLyricObjectMain">
        <div className="savedLyricObjectMainImage">
          <img src={albumArt} style={{ height: 100 }} />
        </div>
        <div className="savedLyricContent">
          <div>
            <em>"{lyrics}"</em>
            {/* <br></br> */}
            <p>
              "{song}" from "{album}" by {artist}
            </p>
          </div>
          <div>
            <button onClick={() => context.deleteLyricObject(id)}>
              Delete
            </button>
          </div>
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
