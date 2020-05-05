import {
  SAVE_LYRICS,
  NONE_SELECTED_ALERT,
  CLEAR_LYRICS,
  DELETE_LYRIC_ITEM,
} from "../Context/Types";
import Context from "./Context";
import React, { useReducer, useEffect } from "react";
import Reducer from "./Reducer";
import uuid from "uuid/v1";

const localData = localStorage.getItem("lyrics");
const preState = localData
  ? JSON.parse(localData)
  : {
      noneSelectedAlert: false,
      savedLyrics: [],
    };

const State = (props) => {
  const initialState = preState;
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    localStorage.setItem("lyrics", JSON.stringify(state));
  }, [state]);

  const replaceLineBreaks = (string) => {
    console.log("test");
    string = string.replace(/\n/g, " ");
    return string;
  };

  const selectText2 = () => {
    if (window.getSelection) {
      var range = window.getSelection().getRangeAt(0);
      var selectionContents = range.cloneContents();
      return selectionContents;
    } else if (document.selection && document.selection.type !== "Control") {
      var contents = document.selection.createRange().cloneContents();
      return contents;
    }
  };

  const selectText = () => {
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

    return selected;
  };

  const saveLyrics = (nowPlaying) => {
    var selected = "";
    selected = selectText();

    //only adds lyric if selection is not empty
    if (selected !== "") {
      // selected = replaceLineBreaks(selected);

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
