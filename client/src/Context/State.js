import {
  GET_GENIUS_URL,
  GET_NOW_PLAYING,
  GET_LYRICS,
  SAVE_LYRICS,
  GET_USER_DATA,
  SET_NOW_PLAYING,
} from "../Context/Types";
import Context from "./Context";
import axios from "axios";
import React, { useReducer, useEffect, useRef, useContext } from "react";
import Reducer from "./Reducer";
import SpotifyWebApi from "spotify-web-api-js";
import uuid from "uuid/v1";

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
const params = getHashParams();
const token = params.access_token;
if (token) {
  spotifyApi.setAccessToken(token);
}

const test = () => {
  return "hello";
};

const State = (props) => {
  const initialState = {
    token: token,
    loggedIn: token ? true : false,
    isSongPlaying: false,
    nowPlaying: {},
    lyrics: "",
    savedLyrics: [],
    geniusUrl: null,
    user: {},
  };
  const [state, dispatch] = useReducer(Reducer, initialState);
  const userRef = useRef({});
  const nowPlaying2 = useRef({});

  //sets the token value in the index.html file
  // window.spotifyToken = token;
  // console.log(state.token);

  const getUserData = (user) => {
    dispatch({
      type: GET_USER_DATA,
      payload: user,
    });
    // console.log(state.user);
  };

  const setNowPlaying = (nowPlaying) => {
    console.log("set now playing");
    dispatch({
      type: SET_NOW_PLAYING,
      payload: nowPlaying,
    });
  };

  const saveLyrics = () => {
    //sets variable to store text user highlights on page
    var selected = "";
    if (window.getSelection) {
      selected = window.getSelection();
    } else if (document.getSelection) {
      selected = document.getSelection();
    } else if (document.selection) {
      selected = document.selection.createRange().text;
    }
    selected = selected.toString();

    //deselects text when user clicks button
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else if (document.selection) {
      document.selection.empty();
    }
    console.log(state.user);

    //check if selection is empty first
    if (selected != "") {
      //adds new lyric object with saved lyrics to array
      dispatch({
        type: SAVE_LYRICS,
        payload: {
          id: uuid(),
          lyrics: selected,
          artist: state.nowPlaying.artist,
          song: state.nowPlaying.name,
          album: state.nowPlaying.album,
        },
      });
    } else {
      alert("No Lyrics highlighted");
    }
  };

  return (
    <Context.Provider
      value={{
        token: state.token,
        loggedIn: state.loggedIn,
        isSongPlaying: state.isSongPlaying,
        nowPlaying: state.nowPlaying,
        lyrics: state.lyrics,
        savedLyrics: state.savedLyrics,
        geniusUrl: state.geniusUrl,
        user: state.user,
        getUserData,
        saveLyrics,
        setNowPlaying,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
