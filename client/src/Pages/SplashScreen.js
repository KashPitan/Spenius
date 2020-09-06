import React, { useState, useEffect } from "react";
import getAccessTokenFromCookie from "../Helper-Functions/CookieFunctions";

const SplashScreen = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(loading);
    if (getAccessTokenFromCookie()) {
      setLoading(true);
    }
  }, []);

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
