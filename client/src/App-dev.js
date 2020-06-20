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

var access_token;

const App_dev = () => {
  const context = useContext(Context);

  const loggedIn = useRef(access_token ? true : false);
  const isSongPlayingBool = useRef(false);

  const [lyrics, setLyrics] = useState("");
  const [geniusUrl, setGeniusUrl] = useState("");

  const nowPlaying2 = useRef({});
  const [nowPlaying, setNowPlaying] = useState({});

  const isInstrumental = useRef(false);

  //get the access_token from the cookie
  const getAccessTokenFromCookie = () => {
    if (!document.cookie) return;
    let match = document.cookie.match(
      new RegExp("(^| )" + "access_token" + "=([^;]+)")
    );
    if (match) access_token = match[2];
    loggedIn.current = true;
  };

  useEffect(() => {
    getAccessTokenFromCookie();
    if (loggedIn.current) {
      setInterval(() => {
        if (!document.hidden) {
          // console.log("tab active");
          getNowPlaying();
        }
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

  /*compares the currently playing song to the one returned
  from the api call. Returns true if the song is already
  playing*/
  const checkSongIsAlreadyPlaying = (song, apiSong) => {
    if (song !== apiSong) return false;
    return true;
  };

  const isSongInstrumental = async (songId) => {
    const res = await axios.get(
      "https://api.spotify.com/v1/audio-features/" + songId,
      {
        headers: { Authorization: "Bearer " + access_token },
      }
    );
    if (res.data.instrumentalness > 0.5) return true;
    return false;
  };

  //spotify api call to get the currently playing song
  const getNowPlaying = async () => {
    if (document.hidden) return;
    let song = {};
    let songId = 0;
    var res;
    try {
      res = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: { Authorization: "Bearer " + access_token },
        }
      );
    } catch (err) {
      console.log(err);
      return;
    }

    //if there is no response from the api call
    if (res && res.status !== 200) {
      isSongPlayingBool.current = false;
      return;
    }
    //get the song id to pass to api call later and check if song is instrumental
    songId = res.data.item.id;
    song = {
      name: res.data.item.name,
      albumArt: res.data.item.album.images[0].url,
      artist: res.data.item.artists[0].name,
      album: res.data.item.album.name,
    };

    let songNowPlaying = JSON.stringify(nowPlaying2.current);
    let apiSong = JSON.stringify(song);

    //checks whether the song returned by the api call is the same as the currnent song
    //if not it updates the components with the new song
    if (!checkSongIsAlreadyPlaying(songNowPlaying, apiSong)) {
      setNowPlaying(song);
      nowPlaying2.current = song;

      if (await isSongInstrumental(songId)) {
        setLyrics("[ Instrumental ]");
      } else {
        // console.log("test");
        getGeniusUrl();
      }
      //updates boolean to show that a song is currently playing
      isSongPlayingBool.current = true;
    }
  };

  const getGeniusUrl = async () => {
    let name = refineSearchTerms(nowPlaying2.current.name);
    let artist = nowPlaying2.current.artist;

    const searchTerms = name + " " + artist;

    try {
      let response = await axios.get(
        "http://localhost:8888/lyrics/genius/search",
        {
          params: {
            searchTerm: searchTerms,
          },
        }
      );

      setGeniusUrl(response.data);
      getLyrics(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getLyrics = async (geniusUrl) => {
    try {
      let response = await axios.get("http://localhost:8888/lyrics/scrape", {
        params: {
          url: geniusUrl,
        },
      });
      setLyrics(response.data);
    } catch (error) {
      console.log(error);
    }
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

export default App_dev;
