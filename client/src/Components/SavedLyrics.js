import React from "react";
import SavedLyricObject from "./SavedLyricObject";

const SavedLyrics = (props) => {
  // const { lyricObjects } = this.props;
  return (
    <div className="savedLyrics">
      {props.lyricObjects.map((lyricObj) => (
        <SavedLyricObject key={lyricObj.id} savedLyricObject={lyricObj} />
      ))}
    </div>
  );
};

export default SavedLyrics;
