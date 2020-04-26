import React, { useContext } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Context from "../../Context/Context";
import "../../navbar2.css";
// import { Link } from "react-router-dom";

const Navbar = () => {
  // const { user, loggedIn } = useContext(Context);
  const spotifyApi = new SpotifyWebApi();

  return (
    <>
      <header>
        <div className="header-text">
          <h1>Sponius? Genify? SPENIUS???</h1>
          <br></br>
          <p>Song lyrics using spotify and genius</p>
        </div>
        <nav className="navbar2">
          <ul className="nav_links">
            <li>
              <a href="http://localhost:8888"> Login</a>
            </li>
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Saved Lyrics</a>
            </li>
            <li>
              <a href="">About</a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
