import { SET_LOGGED_IN, SET_USER } from "../types";
import axios from "axios";

export const toggleLoggedIn = () => {
  dispatch({ type: SET_LOGGED_IN });
};

export const getUser = async () => {
  let res = await axios.get("https://api.spotify.com/v1/me", {
    headers: { Authorization: "Bearer " + access_token },
  });
};
