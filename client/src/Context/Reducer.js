import {
  GET_GENIUS_URL,
  GET_NOW_PLAYING,
  GET_LYRICS,
  SAVE_LYRICS,
  GET_USER_DATA,
} from "../Context/Types";

export default (state, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
