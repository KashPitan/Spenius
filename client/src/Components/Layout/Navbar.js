import React, { useContext, useEffect } from "react";
// import "../../App.css";
import "../../navbar.css";
import { Link } from "react-router-dom";
import UserContext from "../../Context/UserContext/UserContext";

const Navbar = () => {
  const userContext = new useContext(UserContext);
  // console.log(userContext.access_token);
  var access_token = localStorage.getItem("access token");
  var refreshBool;

  if (access_token === "undefined") {
    refreshBool = false;
  } else if (!access_token) {
    refreshBool = false;
  } else {
    refreshBool = true;
  }

  return (
    <>
      <div id="header-text">
        <div id="headerANDicon">
          <div id="header-icon">
            <i className="fas fa-headphones"></i>
          </div>
          <div id="title">
            <h1>Sponius? Genify? SPENIUS???</h1>
          </div>
        </div>

        <div id="connect-button">
          {refreshBool ? (
            <a href="" onClick={userContext.refreshToken}>
              {" "}
              <i className="fab fa-spotify"></i> Refresh Connection
            </a>
          ) : (
            <a href="http://spenius.herokuapp.com/login">
              {/* <a href="http://localhost:8888/login"> */}{" "}
              <i className="fab fa-spotify"></i> Connect with Spotify
            </a>
          )}
          {/* <a href="" onClick={userContext.logIn}>
            {" "}
            <i className="fab fa-spotify"></i> Connect with Spotify
          </a> */}
        </div>
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
