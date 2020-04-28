import { SAVE_LYRICS, NONE_SELECTED_ALERT } from "../Context/Types";

export default (state, action) => {
  switch (action.type) {
    case SAVE_LYRICS:
      return {
        ...state,
        savedLyrics: [...state.savedLyrics, action.payload],
      };
    case NONE_SELECTED_ALERT:
      return {
        ...state,
        noneSelectedAlert: action.payload,
      };

    default:
      return state;
  }
};
