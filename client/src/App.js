import React, {
  Component,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import "./App.css";
import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";
import Context from "./Context/Context";
import Lyrics from "./Components/Lyrics";
import Navbar from "./Components/Layout/Navbar";
import NowPlaying from "./Components/NowPlaying";
import SavedLyrics from "./Components/SavedLyrics";

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
  const [nowPlaying, setNowPlaying] = useState({
    name: "Not Checked",
    albumArt: "",
    artist: "",
    albumName: "",
  });
  const [lyrics, setLyrics] = useState("");
  const [savedLyrics, setSavedLyrics] = useState([]);
  const [geniusUrl, setGeniusUrl] = useState(null);
  const [user, setUser] = useState({});

  const state = {
    loggedIn: token ? true : false,
    isSongPlaying: false,
    nowPlaying: {
      name: "Not Checked",
      albumArt: "",
      artist: "",
      albumName: "",
    },
    lyrics: "",
    savedLyrics: [],
    geniusUrl: null,
    user: {},
  };

  //auto loads lyrics and current track when the page opens
  const componentDidMount = () => {
    if (this.state.loggedIn) {
      updateLoop();
      getUserData();
    }
  };

  useEffect(() => {
    if (this.state.loggedIn) {
      updateLoop();
      getUserData();
    }
  });

  const updateLoop = () => {
    setInterval(() => {
      getNowPlaying();
    }, 5000);
  };

  const getGeniusUrl = () => {
    const searchTerms =
      this.state.nowPlaying.name + " " + this.state.nowPlaying.artist;

    axios
      .get("http://localhost:8888/lyrics/genius/search", {
        params: {
          searchTerm: searchTerms,
        },
      })
      .then((response) => {
        console.log(response.data);
        //replace
        this.setState({ geniusUrl: response.data });
        setGeniusUrl(response.data);
        getLyrics2();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const getLyrics2 = () => {
    axios
      .get("http://localhost:8888/lyrics/scrape", {
        params: {
          url: this.state.geniusUrl,
        },
      })
      .then((response) => {
        //replace
        this.setState({ lyrics: response.data });
        setLyrics(response.data);
        // console.log(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const getUserData = () => {
    //only makes an api call to get user data when logged in to avoid errors
    if (loggedIn) {
      spotifyApi
        .getMe()
        .then((response) => {
          console.log(response);

          //replace
          this.setState({ user: response });
          setUser(response);
        })
        .catch(() => {
          console.log("user not found");
        });
    }
  };

  const saveLyrics = (e) => {
    // var lyrics = window.getSelection().toString();
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

    //replace
    this.setState({
      savedLyrics: [
        ...this.state.savedLyrics,
        {
          lyrics: selected,
          artist: this.state.nowPlaying.artist,
          song: this.state.nowPlaying.name,
          album: this.state.nowPlaying.albumName,
        },
      ],
    });
    setSavedLyrics([
      ...savedLyrics,
      {
        lyrics: selected,
        artist: this.state.nowPlaying.artist,
        song: this.state.nowPlaying.name,
        album: this.state.nowPlaying.albumName,
      },
    ]);
    console.log(this.state.savedLyrics);
  };

  const getNowPlaying = () => {
    spotifyApi
      .getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          isSongPlaying: true,
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url,
            artist: response.item.artists[0].name,
            album: response.item.album.name,
          },
        });
        getGeniusUrl();
      })
      .catch(() => {
        console.log("no song playing");
        this.setState({ isSongPlaying: false });
      });
  };

  const { lyrics2, nowPlaying2, loggedIn2, geniusUrl2 } = state;
  return (
    <>
      <Navbar />
      <NowPlaying nowPlaying={nowPlaying2} />
      <Lyrics lyrics={lyrics2} />
      <SavedLyrics lyricObjects={state.savedLyrics} test={"adsad"} />
      <button onClick={() => saveLyrics()}>save lyrics</button>
      {/* lyricObjects={this.state.savedLyrics} */}
      {/* 
        {loggedIn && (
          <button onClick={() => this.getLyrics2()}>Update Lyrics2</button>
        )}
        {loggedIn && (
          <button onClick={() => this.getGeniusUrl()}>geniusurl</button>
        )} */}
    </>
  );
};

export default App;
