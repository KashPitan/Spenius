import Context from "./UserContext";
import React, { useReducer, useEffect } from "react";
import Reducer from "./UserReducer";
import axios from "axios";
import {
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
  REFRESH_ACCESS_TOKEN,
  LOGIN,
} from "./UserTypes";

const State = (props) => {
  const initialState = {};
  const [state, dispatch] = useReducer(Reducer, initialState);

  const getCookieByName = (name) => {
    let match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    if (match) return match[2];
  };

  //sends a request to get a new access token with the refresh token
  //(see server app.js)
  const refreshToken = async (e) => {
    e.preventDefault();
    let refresh_token = getCookieByName("refresh_token");
    axios
      .get("/refresh_token", {
        params: {
          refresh_token: refresh_token,
        },
      })
      .then(function (response) {
        document.cookie = "access_token=" + response.data.access_token;
      });
  };

  return (
    <Context.Provider
      value={{
        access_token: state.access_token,
        refresh_token: state.refresh_token,
        loggedIn: state.loggedIn,
        refreshToken,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
