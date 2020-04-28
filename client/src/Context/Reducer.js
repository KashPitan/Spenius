import {
  SAVE_LYRICS,
  NONE_SELECTED_ALERT,
  CLEAR_LYRICS,
  DELETE_LYRIC_ITEM,
} from "../Context/Types";

export default (state, action) => {
  switch (action.type) {
    case SAVE_LYRICS:
      return {
        ...state,
        savedLyrics: [...state.savedLyrics, action.payload],
      };
    case NONE_SELECTED_ALERT:
      // console.log("none selected");

      return {
        ...state,
        noneSelectedAlert: action.payload,
      };
    case CLEAR_LYRICS:
      return {
        ...state,
        savedLyrics: [],
      };
    case DELETE_LYRIC_ITEM:
      const newSavedLyrics = state.savedLyrics.filter((lyricObj) => {
        return lyricObj.id !== action.payload;
      });
      return {
        ...state,
        savedLyrics: newSavedLyrics,
      };

    default:
      return state;
  }
};
