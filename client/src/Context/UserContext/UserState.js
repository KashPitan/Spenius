import Context from "./UserContext";
import React, { useReducer, useEffect } from "react";
import Reducer from "./UserReducer";
import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";
import {
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
  REFRESH_ACCESS_TOKEN,
  LOGIN,
} from "./UserTypes";

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

var access_token;
var refresh_token;

const params = getHashParams();
// console.log(params);
// var access_token2 = params.access_token;
// var refresh_token2 = params.refresh_token;

// var localToken = localStorage.getItem("access token");
// var localRefreshToken = localStorage.getItem("refresh token");

// // console.log(access_token2, refresh_token2);
// // console.log(localToken, localRefreshToken);

// refresh_token = localRefreshToken ? localRefreshToken : refresh_token2;
// access_token = localToken ? localToken : access_token2;
// console.log(access_token);
// console.log(refresh_token);

// localStorage.setItem("access token", access_token);
// localStorage.setItem("refresh token", refresh_token);

// spotifyApi.setAccessToken(access_token);

const State = (props) => {
  const initialState = {};
  const [state, dispatch] = useReducer(Reducer, initialState);

  // useEffect(() => {
  //   if (typeof state.access_token != undefined) {
  //     localStorage.setItem("access token", state.access_token);
  //     localStorage.setItem("refresh token", state.refresh_token);
  //   }
  // }, [state.access_token, state.refresh_token]);

  //sends a request to get a new access token with the refresh token
  //(see server app.js)
  const refreshToken = (e) => {
    e.preventDefault();
    const refresh = localStorage.getItem("refresh token");
    // console.log("test");
    // console.log(refresh);

    axios
      .get("/refresh_token", {
        params: {
          refresh_token: refresh,
        },
      })
      .then(function (response) {
        // console.log(response);
        localStorage.setItem("access token", response.data.access_token);
        dispatch({
          type: REFRESH_ACCESS_TOKEN,
          payload: response.data.access_token,
        });
      });
  };

  //sets the access token for the state
  //may or may not be neccessary
  const setAccessToken = () => {
    const params = getHashParams();
    const token = params.access_token;
    dispatch({
      type: SET_ACCESS_TOKEN,
      payload: token,
    });
  };

  //sets the refresh token for the state
  //may or may not be neccessary
  const setRefreshToken = () => {
    const params = getHashParams();
    const refreshToken = params.refresh_token;
    dispatch({
      type: SET_REFRESH_TOKEN,
      payload: refreshToken,
    });
  };

  const logIn = async (e) => {
    console.log("login");
    e.preventDefault();
    const res = await axios.get("/login2");
    console.log(res);
    // window.location.href = res.data;
    window.history.pushState({}, null, res.data);
    // const params = getHashParams();
    // access_token = params.access_token;
    // refresh_token = params.refresh_token;
    console.log(params);

    localStorage.setItem("access token", params.access_token);
    localStorage.setItem("refresh token", params.refresh_token);
    access_token = params.access_token;
    refresh_token = params.refresh_token;

    dispatch({
      type: LOGIN,
      payload: {
        refresh_token: refresh_token,
        access_token: access_token,
      },
    });
  };

  return (
    <Context.Provider
      value={{
        access_token: state.access_token,
        refresh_token: state.refresh_token,
        loggedIn: state.loggedIn,
        setRefreshToken,
        setAccessToken,
        refreshToken,
        logIn,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
