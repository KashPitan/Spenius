import React from "react";
import PropTypes from "prop-types";

const SavedLyricObject = ({
  savedLyricObject: { lyrics, album, artist, song },
}) => {
  return (
    <div className="savedLyricObject">
      <em>"{lyrics}"</em>
      <br></br>
      <p>
        {artist} ({song})
      </p>
      <hr></hr>
    </div>
  );
};

SavedLyricObject.propTypes = {
  savedLyricObject: PropTypes.object.isRequired,
};
export default SavedLyricObject;
