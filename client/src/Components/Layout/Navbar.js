import React, { useContext } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Context from "../../Context/Context";
import "../../App.css";
// import { Link } from "react-router-dom";

const Navbar = () => {
  // const { user, loggedIn } = useContext(Context);
  const spotifyApi = new SpotifyWebApi();

  return (
    <>
      <nav className="navbar">
        <div className="header-text">
          <h1>Sponius? Genify? SPENIUS???</h1>
          <br></br>
          <p>Spotify lyrics using genius</p>
        </div>
        <div className="menu-container">
          <ul className="menu">
            <li>
              <a href="http://localhost:8888"> Login</a>
            </li>
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Lyrics</a>
            </li>
            <li>
              <a href="">About</a>
            </li>
          </ul>
        </div>
      </nav>
      <main></main>
    </>
  );
};

export default Navbar;
