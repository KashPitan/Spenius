import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  useContext,
} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Lyrics from "./Components/Lyrics";
import NowPlaying from "./Components/NowPlaying";
import SavedLyrics from "./Components/SavedLyrics";
import SavedLyricsMain from "./Components/SavedLyricsPage/SavedLyricsMain";
import About from "./Pages/About";
import Context from "./Context/Context";
import Navbar from "./Components/Layout/Navbar";

const getHashParams = () => {
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  e = r.exec(q);
  while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    e = r.exec(q);
  }
  return hashParams;
};

const params = getHashParams();

var access_token;
var refresh_token;

var localToken = localStorage.getItem("access token");
var localRefreshToken = localStorage.getItem("refresh token");

if (localRefreshToken === "undefined") {
  refresh_token = params.refresh_token;
  localStorage.setItem("refresh token", refresh_token);
} else if (!localRefreshToken) {
  refresh_token = params.refresh_token;
  localStorage.setItem("refresh token", refresh_token);
} else {
  // console.log(localRefreshToken);
  refresh_token = localRefreshToken;
}

if (localToken === "undefined") {
  access_token = params.access_token;
  localStorage.setItem("access token", access_token);
} else if (!localToken) {
  access_token = params.access_token;
  localStorage.setItem("access token", access_token);
} else {
  access_token = localToken;
}

const App = () => {
  const context = useContext(Context);

  const [loggedIn, setLoggedIn] = useState(access_token ? true : false);
  const isSongPlayingBool = useRef(false);

  const [lyrics, setLyrics] = useState("");
  const [geniusUrl, setGeniusUrl] = useState("");

  const nowPlaying2 = useRef({});
  const [nowPlaying, setNowPlaying] = useState({});

  useEffect(() => {
    if (loggedIn) {
      setInterval(() => {
        if (!document.hidden) {
          // console.log("tab active");
          getNowPlaying();
        }
      }, 2000);
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    // console.log("test");
    localStorage.setItem("access token", access_token);
    localStorage.setItem("refresh token", refresh_token);
  }, [access_token, refresh_token]);

  //removes characters in brackets from search strings
  //to improve accuracy of search
  const refineSearchTerms = (s) => {
    if (s.includes("(")) {
      s = s.substring(0, s.indexOf("("));
    }
    if (s.includes("-")) {
      s = s.substring(0, s.indexOf("-"));
    }
    return s;
  };

  const getNowPlaying = () => {
    let song = {};
    axios
      .get("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: { Authorization: "Bearer " + access_token },
      })
      .then((response) => {
        // console.log(response.data.item.name);
        song = {
          name: response.data.item.name,
          albumArt: response.data.item.album.images[0].url,
          artist: response.data.item.artists[0].name,
          album: response.data.item.album.name,
        };

        //checks whether the song returned by the api call is the same as the currnent song
        //if not it updates the components with the new song
        if (JSON.stringify(nowPlaying2.current) !== JSON.stringify(song)) {
          // console.log("isnew");
          setNowPlaying(song);
          nowPlaying2.current = song;
          getGeniusUrl();
        }
        isSongPlayingBool.current = true;
        // console.log(isSongPlaying);
      })
      .catch((err) => {
        isSongPlayingBool.current = false;
      });
  };

  const getGeniusUrl = () => {
    var name = refineSearchTerms(nowPlaying2.current.name);
    var artist = nowPlaying2.current.artist;

    const searchTerms = name + " " + artist;

    axios
      .get("http://localhost:8888/lyrics/genius/search", {
        params: {
          searchTerm: searchTerms,
        },
      })
      .then(function (response) {
        setGeniusUrl(response.data);
        getLyrics(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const getLyrics = (geniusUrl) => {
    // console.log("getting lyrics from params" + geniusUrl);
    axios
      .get("http://localhost:8888/lyrics/scrape", {
        params: {
          url: geniusUrl,
        },
      })
      .then((response) => {
        setLyrics(response.data);
        // console.log(response.data);
      })
      .catch(function (err) {
        // console.log(err);
      });
  };

  return (
    <Router>
      <>
        {/* <Navbar2 /> */}
        <Navbar />
        <hr></hr>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Fragment>
                <div className="container">
                  <div className="nowPlaying-savedLyrics">
                    <NowPlaying
                      geniusUrl={geniusUrl}
                      nowPlaying={nowPlaying}
                      isPlaying={isSongPlayingBool.current}
                    />
                    <div id="savedLyricsDiv">
                      <h1>Saved Lyrics</h1>
                      <hr></hr>
                      <div className="savedLyrics2">
                        <SavedLyrics />
                      </div>
                    </div>
                    <button
                      id="saveLyricsButton"
                      onClick={() => context.saveLyrics(nowPlaying2.current)}
                    >
                      Save Lyrics
                    </button>
                    {context.noneSelectedAlert && (
                      <p>Text selection cannot be empty!</p>
                    )}
                  </div>

                  <Lyrics lyrics={lyrics} />
                </div>
              </Fragment>
            )}
          ></Route>
          <Route exact path="/about" component={About} />
          <Route
            exact
            path="/lyrics"
            render={(props) => (
              <Fragment>
                <div className="container2">
                  <div id="lyricsPageTitle">
                    <h1>Saved Lyrics</h1>
                    <hr></hr>
                  </div>
                  <SavedLyricsMain />
                  <button onClick={() => context.clearLyrics()}>
                    Clear Lyrics
                  </button>
                </div>
              </Fragment>
            )}
          />
        </Switch>
      </>
    </Router>
  );
};

export default App;
