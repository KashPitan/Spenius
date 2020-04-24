import React, { useEffect, useContext } from "react";
import Context from "../Context/Context";

const NowPlaying = ({ nowPlaying }) => {
  const context = useContext(Context);
  console.log(context.NowPlaying);
  return (
    <div>
      <p>
        <strong>{nowPlaying.name}</strong>
      </p>
      <p>By: {nowPlaying.artist}</p>
      <p>Album: {nowPlaying.album}</p>

      <div>
        <img src={nowPlaying.albumArt} style={{ height: 150 }} />
      </div>
    </div>
  );
};

export default NowPlaying;
