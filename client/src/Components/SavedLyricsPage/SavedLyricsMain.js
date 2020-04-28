import React, { useContext } from "react";
import SavedLyricObjectMain from "./SavedLyricObjectMain";
import Context from "../../Context/Context";
import "../../Styles/SavedLyricsStyles.css";

const SavedLyrics = () => {
  const context = useContext(Context);
  return (
    <>
      <div className="savedLyrics">
        {context.savedLyrics.map((lyricObj) => (
          <SavedLyricObjectMain key={lyricObj.id} savedLyricObject={lyricObj} />
        ))}
      </div>
    </>
  );
};

export default SavedLyrics;
