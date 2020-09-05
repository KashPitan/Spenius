import {
  SET_CURRENT_SONG,
  SET_IS_PLAYING,
  SET_GENIUS_URL,
  SET_SONG_LYRICS,
} from "../types";

const initialState = {
  song: { name: "", artist: "", album: "", albumArt: "" },
  geniusUrl: null,
  isPlaying: false,
  lyrics: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_SONG:
      return {
        ...state,
        song: action.payload,
      };
    case SET_IS_PLAYING:
      return {
        ...state,
        isPlaying: action.payload,
      };
    case SET_GENIUS_URL:
      return {
        ...state,
        geniusUrl: action.payload,
      };
    case SET_SONG_LYRICS:
      return {
        ...state,
        lyrics: action.payload,
      };
    default:
      return state;
  }
};
