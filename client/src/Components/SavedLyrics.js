import React from "react";
import SavedLyricObject from "./SavedLyricObject";

const SavedLyrics = (props) => {
  // const { lyricObjects } = this.props;
  return (
    <div>
      {props.lyricObjects.map((lyricObj) => (
        <SavedLyricObject savedLyricObject={lyricObj} />
      ))}
    </div>
  );
};

export default SavedLyrics;
