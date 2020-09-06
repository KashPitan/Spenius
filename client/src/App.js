import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";

import About from "./Pages/About";
import Navbar from "./Components/Layout/Navbar";

//Pages
import SplashScreen from "./Pages/SplashScreen";
import LyricsPage from "./Pages/LyricsPage";
import MainPage from "./Pages/MainPage";

//functions
import getAccessTokenFromCookie from "./Helper-Functions/CookieFunctions";
import refineSearchTerms from "./Helper-Functions/RefineSearchTerms";
import checkSongIsAlreadyPlaying from "./Helper-Functions/CheckSongIsAlreadyPlaying";
import isSongInstrumental from "./Helper-Functions/IsSongInstrumental";

var access_token;

const App_dev = () => {
  const loggedIn = useRef(access_token ? true : false);
  const isSongPlayingBool = useRef(false);

  const [lyrics, setLyrics] = useState("");
  const [geniusUrl, setGeniusUrl] = useState("");

  const nowPlaying2 = useRef({});
  const [nowPlaying, setNowPlaying] = useState({});

  useEffect(() => {
    access_token = getAccessTokenFromCookie();
    if (access_token) loggedIn.current = true;
    if (loggedIn.current) {
      setInterval(() => {
        if (!document.hidden) {
          getNowPlaying();
        }
      }, 2000);
    }
    //eslint-disable-next-line
  }, []);

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
        "http://spenius.herokuapp.com/lyrics/genius/search",
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
      let response = await axios.get(
        "http://spenius.herokuapp.com/lyrics/scrape",
        {
          params: {
            url: geniusUrl,
          },
        }
      );
      setLyrics(response.data);
    } catch (error) {}
  };
  return (
    <>
      {loggedIn.current ? (
        <Router>
          <>
            <Navbar />
            <hr></hr>
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <MainPage
                    geniusUrl={geniusUrl}
                    nowPlaying={nowPlaying}
                    isSongPlaying={isSongPlayingBool.current}
                    nowPlaying2={nowPlaying2}
                    lyrics={lyrics}
                  />
                )}
              ></Route>
              <Route exact path="/about" component={About} />
              <Route exact path="/lyrics" component={LyricsPage} />
            </Switch>
          </>
        </Router>
      ) : (
        <SplashScreen />
      )}
    </>
  );
  // <Provider store={store}>
  // </Provider>
};

export default App_dev;
