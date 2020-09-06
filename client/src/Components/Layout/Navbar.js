import React, { useContext, useEffect, useRef } from "react";
// import "../../App.css";
import "../../navbar.css";
import { Link } from "react-router-dom";

//functions
import getCookieByName from "../../Helper-Functions/CookieFunctions";

var access_token;

const Navbar = () => {
  const refreshBool = useRef(access_token ? true : false);

  useEffect(() => {
    access_token = getCookieByName("access_token");
    if (access_token) {
      refreshBool.current = true;
    }
  }, []);

  return (
    <>
      <div id="header-text">
        <div id="headerANDicon">
          <div id="header-icon">
            <i className="fas fa-headphones"></i>
          </div>
          <div id="title">
            <div id="desktop-title">
              <h1>Sponius? Genify? SPENIUS???</h1>
            </div>
            <div id="mobile-title">
              <h1>SPENIUS</h1>
            </div>
          </div>
        </div>

        {/* <div id="connect-button">
          {refreshBool.current ? (
            //<a href="http://spenius.herokuapp.com/refresh_token">
            <a href="http://localhost:8888/refresh_token">
              {" "}
              <i className="fab fa-spotify"></i> Refresh Connection
            </a>
          ) : (
            //<a href="http://spenius.herokuapp.com/login">
            <a href="http://localhost:8888/login">
              {" "}
              <i className="fab fa-spotify"></i> Connect with Spotify
            </a>
          )}
        </div> */}
      </div>
      <div id="header-text2">
        <h3>
          Automatically retrieve lyrics for currently playing Spotify song from
          Genius
        </h3>
        <hr id="headerRule"></hr>
      </div>

      <header id="header2">
        <nav id="navmenu">
          <ul className="nav-links">
            <li className="nav-link">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-link">
              <Link to="/lyrics">Saved Lyrics</Link>
            </li>
            <li className="nav-link">
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
