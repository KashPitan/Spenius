import React from "react";
import "../Styles/AboutPageStyles.css";

const About = () => {
  return (
    <div className="about-container">
      <div id="AboutContents">
        <h1>ABOUT </h1>
        <hr></hr>
        <div id="howToUse">
          <h2>How to use</h2>
          <ol>
            <li>
              Connect to your Spotify account by clicking the login button
            </li>
            <li>Start playing a song through your account on any device</li>
            <li>
              The song you are currently playing along with the lyrics should
              automatically appear on the home page
            </li>
            <li>
              Highlight lyrics and click the "Save Lyrics" button to save them
              and view
            </li>
            <li>
              Click on the "Saved lyrics" button in the navbar to see all saved
              lyrics and remove unwanted ones
            </li>
          </ol>
          <em>
            NOTE: If you are logged in and playing a song and nothing is
            appearing on the home screen hit the login button to refresh your
            login. This also happens every hour or so.
          </em>
        </div>
        <div id="whyContents">
          <h2>Why?</h2>
          <p id="whyText">
            An application that performed this function did exist in mobile form
            with the Genius app but at some point a few years ago it stopped
            working properly for me and others. Because of that I decided to try
            and create an application with similar functionality.
          </p>
        </div>
        <div id="spenius">
          <h2>Spenius???</h2>
          <p>Suggest a better name then</p>
        </div>
        <div id="feedback">
          <h2>Feedback</h2>
          <p>
            All feedback and improvement suggestions are welcome. No promises to
            deliver on anything though. If you're reading this you probably
            already know a way to contact me to suggest stuff.
          </p>
        </div>
        <div id="futurePlans">
          <h2>Future Plans</h2>
          <ol>
            <li>
              A Genius lyrics message type feature. For reference:{" "}
              <a
                href="https://genius.com/a/genius-lyric-messages-are-coming"
                target="_blank"
              >
                see here
              </a>
            </li>
            <li>Responsive design improvements</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default About;
