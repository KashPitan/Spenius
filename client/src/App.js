import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";
import uuid from "uuid/v1";
import Lyrics from "./Components/Lyrics";
import Navbar from "./Components/Layout/Navbar";
import NowPlaying from "./Components/NowPlaying";
import SavedLyrics from "./Components/SavedLyrics";
import State from "./Context/State";

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
  const params = getHashParams();
  const token = params.access_token;
  // const userContext = useContext(Context);

  if (token) {
    spotifyApi.setAccessToken(token);
  }

  const [loggedIn, setLoggedIn] = useState(token ? true : false);
  const [isSongPlaying, setIsSongPlaying] = useState(false);

  const [lyrics, setLyrics] = useState("");
  const [savedLyrics, setSavedLyrics] = useState([]);
  const [user, setUser] = useState({});

  const geniusUrlRef = useRef(null);
  const [geniusUrl, setGeniusUrl] = useState(null);

  const nowPlaying2 = useRef({});
  const [nowPlaying, setNowPlaying] = useState({});

  const state = {
    loggedIn: token ? true : false,
    isSongPlaying: false,
    nowPlaying: {
      name: "",
      albumArt: "",
      artist: "",
      albumName: "",
    },
    lyrics: "",
    savedLyrics: [],
    geniusUrl: null,
    user: {},
  };

  useEffect(() => {
    if (loggedIn) {
      setInterval(() => {
        // console.log("test");
        getNowPlaying();
      }, 5000);
      getUserData();
    }
    //eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   getGeniusUrl();
  // }, [nowPlaying]);

  const getGeniusUrl = () => {
    const searchTerms =
      nowPlaying2.current.name + " " + nowPlaying2.current.artist;
    console.log(searchTerms);

    axios
      .get("http://localhost:8888/lyrics/genius/search", {
        params: {
          searchTerm: searchTerms,
        },
      })
      .then(function (response) {
        // console.log(response.data);
        // setGeniusUrl(response.data);
        geniusUrlRef.current = response.data;
        console.log(geniusUrlRef.current);
        getLyrics();
      })
      .catch(function (err) {
        console.log(err);
      });

    // getLyrics();
  };

  const getLyrics = () => {
    axios
      .get("http://localhost:8888/lyrics/scrape", {
        params: {
          url: geniusUrlRef.current,
        },
      })
      .then((response) => {
        setLyrics(response.data);
        console.log(response.data);
      })
      .catch(function (err) {
        // console.log(err);
      });
  };

  const getUserData = () => {
    //only makes an api call to get user data when logged in to avoid errors
    if (loggedIn) {
      spotifyApi
        .getMe()
        .then((response) => {
          // console.log(response);
          setUser(response);
        })
        .catch(() => {
          console.log("user not found");
        });
    }
  };

  const saveLyrics = () => {
    // var lyrics = window.getSelection().toString();

    //sets variable to store text user highlights on page
    var selected = "";
    if (window.getSelection) {
      selected = window.getSelection();
    } else if (document.getSelection) {
      selected = document.getSelection();
    } else if (document.selection) {
      selected = document.selection.createRange().text;
    }
    // console.log(selected.toString());
    selected = selected.toString();

    //deselects text when user clicks button
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else if (document.selection) {
      document.selection.empty();
    }

    //adds new lyric object with saved lyrics to array
    setSavedLyrics([
      ...savedLyrics,
      {
        id: uuid(),
        lyrics: selected,
        artist: nowPlaying.artist,
        song: nowPlaying.name,
        album: nowPlaying.album,
      },
    ]);
  };

  const getNowPlaying = () => {
    var song = {};
    spotifyApi
      .getMyCurrentPlaybackState()
      .then((response) => {
        // console.log(response);
        // console.log("test get now playing");

        song = {
          name: response.item.name,
          albumArt: response.item.album.images[0].url,
          artist: response.item.artists[0].name,
          album: response.item.album.name,
        };

        if (JSON.stringify(nowPlaying2.current) !== JSON.stringify(song)) {
          console.log("new song");
          setNowPlaying(song);
          nowPlaying2.current = song;
          getGeniusUrl();
        }
        setIsSongPlaying(true);
        // console.log(isSongPlaying);
        // getGeniusUrl();
      })
      .catch(() => {
        console.log("no song playing");
        setIsSongPlaying(false);
      });
  };

  return (
    <>
      <State>
        <Navbar />
        <NowPlaying nowPlaying={nowPlaying} />
        <Lyrics lyrics={lyrics} />
        <SavedLyrics lyricObjects={savedLyrics} test={"adsad"} />
        <button onClick={() => saveLyrics()}>save lyrics</button>

        {/* {loggedIn && (
        <button
          onClick={() => {
            console.log(nowPlaying);
          }}
        >
          nowPlaying
        </button>
      )} */}

        {/* {loggedIn && <button onClick={() => getLyrics()}>Update Lyrics2</button>}
      {loggedIn && <button onClick={() => getGeniusUrl()}>geniusurl</button>} */}
      </State>
    </>
  );
};

export default App;
