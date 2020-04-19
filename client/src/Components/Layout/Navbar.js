import React, { useContext } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Context from "../../Context/Context";
import "../../App.css";
// import { Link } from "react-router-dom";

const Navbar = () => {
  // const { user, loggedIn } = useContext(Context);
  const spotifyApi = new SpotifyWebApi();

  return (
    <nav>
      <h1>Sponius? Genify?</h1>
      <p>Spotify lyrics using genius</p>
      <ul>
        <li>
          <a href="http://localhost:8888"> Login</a>
        </li>
        <li>
          <a href="">Home</a>
        </li>
        <li>
          <a href="">Lyrics</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
