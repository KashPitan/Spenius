import React from "react";
import "../../navbar2.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header>
        <div id="header-items">
          <div id="header-icon">
            <i className="fas fa-headphones"></i>
          </div>
          <div className="header-text">
            <h1>Sponius? Genify? SPENIUS???</h1>
            <br></br>
            <p>Song lyrics using spotify and genius</p>
          </div>
        </div>

        <div className="navbarItemsDiv">
          <nav className="navbar2">
            <ul className="nav_links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/lyrics">Saved Lyrics</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li id="loginButton">
                <a href="http://spenius.herokuapp.com/login">Login</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
