import React, { useState, useEffect } from "react";
import {
  getAccessTokenFromCookie,
  getCookieByName,
} from "../Helper-Functions/CookieFunctions";
// import axios from "axios";

const SplashScreen = () => {
  const [loading, setLoading] = useState(false);
  // const [refreshToken, setRefreshToken] = useState(
  //   getCookieByName("refresh_token")
  // );

  useEffect(() => {
    if (getAccessTokenFromCookie()) {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    console.log("test");
  }, [loading]);

  // const onClickHandler = async (e) => {
  //   e.preventDefault();

  //   let refresh_token = getCookieByName("refresh_token");
  //   try {
  //     const res = await axios.get("/refresh_token", {
  //       params: {
  //         refresh_token: refresh_token,
  //       },
  //     });
  //     setLoading(true);
  //   } catch (err) {}
  // };

  // const button = () => {
  //   if (refreshToken) {
  //     return (
  //       <a
  //         href=""
  //         onClick={onClickHandler} /*http://spenius.herokuapp.com/login*/
  //       >
  //         {" "}
  //         <i className="fab fa-spotify"></i> Login to Spotify
  //       </a>
  //     );
  //   } else {
  //     return (
  //       <a
  //         href="http://localhost:8888/login" /*http://spenius.herokuapp.com/login*/
  //       >
  //         {" "}
  //         <i className="fab fa-spotify"></i> Login to Spotify
  //       </a>
  //     );
  //   }
  // };

  return (
    <>
      <div className="splash-screen">
        <div id="splash-header-and-icon">
          <h1>SPENIUS</h1>
          <i id="brain-icon" className="fas fa-brain"></i>
        </div>

        <h2>
          Automatically retrieve lyrics for currently playing Spotify song from
          Genius!
        </h2>
        <div className="splash-screen-button">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <a
              href="http://spenius.herokuapp.com/login" /*http://localhost:8888/login*/
            >
              {" "}
              <i className="fab fa-spotify"></i> Login to Spotify
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default SplashScreen;
