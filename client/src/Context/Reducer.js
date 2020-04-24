import {
  GET_GENIUS_URL,
  GET_NOW_PLAYING,
  GET_LYRICS,
  SAVE_LYRICS,
  GET_USER_DATA,
  SET_NOW_PLAYING,
} from "../Context/Types";

export default (state, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      // console.log(action.payload);
      return {
        ...state,
        user: action.payload,
      };
    case SAVE_LYRICS:
      return {
        ...state,
        savedLyrics: [...state.savedLyrics, action.payload],
      };
    case SET_NOW_PLAYING:
      // console.log(action.payload);
      return {
        ...state,
        nowPlaying: action.payload,
      };
    default:
      return state;
  }
};
