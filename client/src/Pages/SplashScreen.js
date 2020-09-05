import React from "react";

const SplashScreen = () => {
  console.log("SPLASH");
  return (
    <>
      <h1>SPENIUS</h1>
      <a href="http://localhost:8888/login">
        {" "}
        <i className="fab fa-spotify"></i> Connect with Spotify
      </a>
    </>
  );
};

export default SplashScreen;
