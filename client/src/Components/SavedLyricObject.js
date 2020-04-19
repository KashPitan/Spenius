import React from "react";
import PropTypes from "prop-types";

const SavedLyricObject = ({
  savedLyricObject: { lyrics, album, artist, song },
}) => {
  return (
    <div>
      <h3>Lyric: "{lyrics}"</h3>
      <p>
        Track: "{song}" from "{album}" by {artist}
      </p>
    </div>
  );
};

SavedLyricObject.propTypes = {
  savedLyricObject: PropTypes.object.isRequired,
};
export default SavedLyricObject;
