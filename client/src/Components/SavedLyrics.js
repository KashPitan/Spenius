import React, { useContext } from "react";
import SavedLyricObject from "./SavedLyricObject";
import Context from "../Context/Context";

const SavedLyrics = (props) => {
  const context = useContext(Context);
  // const { lyricObjects } = this.props;
  return (
    // <div>
    //   {props.lyricObjects.map((lyricObj) => (
    //     <SavedLyricObject key={lyricObj.id} savedLyricObject={lyricObj} />
    //   ))}
    // </div>
    <div>
      {context.savedLyrics.map((lyricObj) => (
        <SavedLyricObject key={lyricObj.id} savedLyricObject={lyricObj} />
      ))}
    </div>
  );
};

export default SavedLyrics;
