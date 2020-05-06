import {
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
  REFRESH_ACCESS_TOKEN,
  LOGIN,
} from "./UserTypes";

export default (state, action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        access_token: action.payload,
      };
    case SET_REFRESH_TOKEN:
      return {
        ...state,
        refresh_token: action.payload,
      };
    case REFRESH_ACCESS_TOKEN:
      return {
        ...state,
        access_token: action.payload,
      };
    case LOGIN:
      console.log("object");
      return {
        loggedIn: true,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
      };
    default:
      return state;
  }
};
