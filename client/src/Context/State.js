import {
  SAVE_LYRICS,
  NONE_SELECTED_ALERT,
  CLEAR_LYRICS,
  DELETE_LYRIC_ITEM,
} from "../Context/Types";
import Context from "./Context";
import React, { useReducer } from "react";
import Reducer from "./Reducer";
import uuid from "uuid/v1";

const State = (props) => {
  const initialState = {
    noneSelectedAlert: false,
    savedLyrics: [],
  };
  const [state, dispatch] = useReducer(Reducer, initialState);

  const saveLyrics = (nowPlaying) => {
    // var lyrics = window.getSelection().toString();

    //sets variable to store text user highlights on page
    var selected = "";
    if (window.getSelection) {
      selected = window.getSelection();
    } else if (document.getSelection) {
      selected = document.getSelection();
    } else if (document.selection) {
      selected = document.selection.createRange().text;
    }

    selected = selected.toString();

    //deselects text when user clicks button
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else if (document.selection) {
      document.selection.empty();
    }

    //only adds lyric if selection is not empty
    if (selected !== "") {
      //adds new lyric object with saved lyrics to array
      dispatch({
        type: SAVE_LYRICS,
        payload: {
          id: uuid(),
          lyrics: selected,
          artist: nowPlaying.artist,
          song: nowPlaying.name,
          album: nowPlaying.album,
          albumArt: nowPlaying.albumArt,
        },
      });
    } else {
      showAlert();
    }
  };

  const clearLyrics = () => {
    dispatch({ type: CLEAR_LYRICS, payload: null });
  };

  const deleteLyricObject = (id) => {
    dispatch({ type: DELETE_LYRIC_ITEM, payload: id });
  };

  const showAlert = () => {
    dispatch({
      type: NONE_SELECTED_ALERT,
      payload: !state.noneSelectedAlert,
    });

    setTimeout(() => {
      dispatch({
        type: NONE_SELECTED_ALERT,
        payload: !state.noneSelectedAlert,
      });
    }, 3000);
  };

  return (
    <Context.Provider
      value={{
        savedLyrics: state.savedLyrics,
        saveLyrics,
        clearLyrics,
        deleteLyricObject,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
