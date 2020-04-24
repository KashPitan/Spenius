import React, { useContext, useEffect } from "react";
import Context from "../../Context/Context";
import "../../App.css";
// import { Link } from "react-router-dom";

const Navbar = () => {
  const context = useContext(Context);

  var user;
  useEffect(() => {
    // context.getUserData();
    user = context.user;
    console.log(context.user);
    // console.log(context.savedLyrics);
  }, []);

  return (
    <nav>
      <div className="header-text">
        <h1>Sponius? Genify? Spenius???</h1>
        <br></br>
        <p>Spotify lyrics using genius</p>
      </div>

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
        {context.user && <li>{/* <a href="">{user.display_name}</a> */}</li>}
      </ul>
    </nav>
  );
};

export default Navbar;
