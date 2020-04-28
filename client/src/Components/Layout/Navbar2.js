import React from "react";
import "../../navbar2.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header>
        <div id="header-icon">
          <i className="fas fa-headphones"></i>
        </div>
        <div className="header-text">
          <h1>Sponius? Genify? SPENIUS???</h1>
          <br></br>
          <p>Song lyrics using spotify and genius</p>
        </div>
        <nav className="navbar2">
          <ul className="nav_links">
            <li>
              <a href="http://localhost:8888/login"> Login</a>
            </li>
            <li>
              {/* <a href="/">Home</a> */}
              <Link to="/">Home</Link>
            </li>
            <li>
              {/* <a href="">Saved Lyrics</a> */}
              <Link to="/lyrics">Saved Lyrics</Link>
            </li>
            <li>
              {/* <a href="/about">About</a> */}
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
