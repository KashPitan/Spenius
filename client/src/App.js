import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  useContext,
} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";
import Lyrics from "./Components/Lyrics";
import Navbar2 from "./Components/Layout/Navbar2";
import NowPlaying from "./Components/NowPlaying";
import SavedLyrics from "./Components/SavedLyrics";
import SavedLyricsMain from "./Components/SavedLyricsPage/SavedLyricsMain";
import About from "./Pages/About";
import Context from "./Context/Context";

const spotifyApi = new SpotifyWebApi();

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

const App = () => {
  const context = useContext(Context);

  const params = getHashParams();
  const token = params.access_token;

  if (token) {
    spotifyApi.setAccessToken(token);
  }

  const [loggedIn, setLoggedIn] = useState(token ? true : false);
  // const [isSongPlaying, setIsSongPlaying] = useState(false);
  const isSongPlayingBool = useRef(false);

  const [lyrics, setLyrics] = useState("");

  const geniusUrlRef = useRef(null);
  // const [geniusUrl, setGeniusUrl] = useState(null);

  const nowPlaying2 = useRef({});
  const [nowPlaying, setNowPlaying] = useState({});

  useEffect(() => {
    if (loggedIn) {
      setInterval(() => {
        getNowPlaying();
      }, 2000);
    }
    //eslint-disable-next-line
  }, []);

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

  const getGeniusUrl = () => {
    var name = refineSearchTerms(nowPlaying2.current.name);
    var artist = nowPlaying2.current.artist;

    // console.log(name, artist);
    // console.log(nowPlaying2.current.name, nowPlaying2.current.artist);

    const searchTerms = name + " " + artist;
    const searchTerms2 =
      nowPlaying2.current.name + " " + nowPlaying2.current.artist;

    // console.log(searchTerms);
    // console.log(searchTerms2);

    axios
      .get("http://spenius.herokuapp.com/lyrics/genius/search", {
        params: {
          searchTerm: searchTerms,
        },
      })
      .then(function (response) {
        geniusUrlRef.current = response.data;

        getLyrics();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const getLyrics = () => {
    axios
      .get("http://spenius.herokuapp.com/lyrics/scrape", {
        params: {
          url: geniusUrlRef.current,
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

  const getNowPlaying = () => {
    var song = {};
    spotifyApi
      .getMyCurrentPlaybackState()
      .then((response) => {
        song = {
          name: response.item.name,
          albumArt: response.item.album.images[0].url,
          artist: response.item.artists[0].name,
          album: response.item.album.name,
        };

        //checks whether the song returned by the api call is the same as the currnent song
        //if not it updates the components with the new song
        if (JSON.stringify(nowPlaying2.current) !== JSON.stringify(song)) {
          setNowPlaying(song);
          nowPlaying2.current = song;
          getGeniusUrl();
        }
        isSongPlayingBool.current = true;
        // console.log(isSongPlaying);
      })
      .catch(() => {
        isSongPlayingBool.current = false;
      });
  };

  return (
    <Router>
      <>
        <Navbar2 />
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
                      nowPlaying={nowPlaying}
                      isPlaying={isSongPlayingBool.current}
                    />
                    <h1>Saved Lyrics</h1>
                    <hr></hr>
                    <div className="savedLyrics2">
                      <SavedLyrics />
                    </div>
                    <button
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
