import {
  GET_GENIUS_URL,
  GET_NOW_PLAYING,
  GET_LYRICS,
  SAVE_LYRICS,
  GET_USER_DATA,
} from "../Context/Types";
import Context from "./Context";
import axios from "axios";
import React, { useReducer } from "react";
import Reducer from "./Reducer";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

const State = (props) => {
  const initialState = {
    loggedIn: false,
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
  const [state, dispatch] = useReducer(Reducer, initialState);

  const getUserData = () => {
    //only makes an api call to get user data when logged in to avoid errors
    if (this.state.loggedIn) {
      spotifyApi
        .getMe()
        .then((response) => {
          // console.log(response);
          // setUser(response);
          dispatch({
            type: GET_USER_DATA,
            payload: response,
          });
        })
        .catch(() => {
          console.log("user not found");
        });
    }
  };

  return (
    <Context.Provider
      value={{
        loggedIn: state.loggedIn,
        isSongPlaying: state.isSongPlaying,
        nowPlaying: state.nowPlaying,
        lyrics: state.lyrics,
        savedLyrics: state.savedLyrics,
        geniusUrl: state.geniusUrl,
        user: state.user,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
