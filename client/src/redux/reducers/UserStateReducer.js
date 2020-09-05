import { SET_LOGGED_IN, SET_USER } from "../types";

const initialState = {
  user: null,
  loggedIn: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN:
      return {
        ...state,
        loggedIn: !state.loggedIn,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
