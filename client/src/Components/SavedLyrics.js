import React, { useContext } from "react";
import SavedLyricObject from "./SavedLyricObject";
import Context from "../Context/Context";

const SavedLyrics = () => {
  const context = useContext(Context);
  return (
    <>
      <div className="savedLyrics">
        {context.savedLyrics.map((lyricObj) => (
          <SavedLyricObject key={lyricObj.id} savedLyricObject={lyricObj} />
        ))}
      </div>
    </>
  );
};

export default SavedLyrics;
