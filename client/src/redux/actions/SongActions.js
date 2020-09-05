import {
  SET_CURRENT_SONG,
  SET_IS_PLAYING,
  SET_GENIUS_URL,
  SET_SONG_LYRICS,
} from "../types";
import axios from "axios";
import store from "../../store";

export const getCurrentSong2 = () => {
  return { type: SET_CURRENT_SONG };
};

export const getCurrentSong = () => async (dispatch) => {
  if (document.hidden) return;
  let res;
  let song;
  let access_token = getAccessTokenFromCookie();
  let songId;
  try {
    //api call to get the song currently playing through spotify account
    res = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: "Bearer " + access_token },
      }
    );
    //song id for api call to check if song is instrumental
    songId = res.data.item.id;
    //song object for comparing
    song = {
      name: res.data.item.name,
      albumArt: res.data.item.album.images[0].url,
      artist: res.data.item.artists[0].name,
      album: res.data.item.album.name,
    };

    let songNowPlaying = JSON.stringify(store.getState().song.song);
    let apiSong = JSON.stringify(song);

    //checks whether the song returned by the api call is the same as the currnent song
    //if not it updates the components with the new song
    if (!checkSongIsAlreadyPlaying(songNowPlaying, apiSong)) {
      console.log("test");
      await dispatch({ type: SET_CURRENT_SONG, payload: song });

      if (await isSongInstrumental(songId)) {
        //if the song is instrumental display instrumental as lyrics
        dispatch({ type: SET_SONG_LYRICS, payload: "[ Instrumental ]" });
      } else {
        //if song is not instrumental get the genius url to retrieve lyrics
        getGeniusUrl(dispatch);
      }
    }
    //update the redux state to show the song is playing
    await dispatch({ type: SET_IS_PLAYING, payload: true });
  } catch (err) {
    console.log(err);
    return;
  }
  setTimeout(async () => {
    await getCurrentSong(dispatch);
    console.log("looping");
  }, 2000);
};

export const getGeniusUrl = async (dispatch) => {
  let name = refineSearchTerms(store.getState().song.song.name);
  let artist = store.getState().song.song.artist;

  const searchTerms = name + " " + artist;

  try {
    let res = await axios.get("http://localhost:8888/lyrics/genius/search", {
      params: {
        searchTerm: searchTerms,
      },
    });
    console.log(res);
    dispatch({ type: SET_GENIUS_URL, payload: res.data });
    getLyrics(dispatch);
  } catch (error) {
    console.log(error);
  }
};

const getLyrics = async (dispatch) => {
  let geniusUrl = store.getState().song.geniusUrl;
  console.log(geniusUrl);
  try {
    let res = await axios.get("http://localhost:8888/lyrics/scrape", {
      params: {
        url: geniusUrl,
      },
    });
    dispatch({ type: SET_SONG_LYRICS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

//HELPER FUNCTIONS

//removes characters in brackets from search strings
//to improve accuracy of search
const refineSearchTerms = (s) => {
  if (s.includes("(")) {
    s = s.substring(0, s.indexOf("("));
  }
  if (s.includes("-")) {
    s = s.substring(0, s.indexOf("-"));
  }
  return s;
};

//get the access_token from the cookie
const getAccessTokenFromCookie = () => {
  if (!document.cookie) return;
  let access_token;
  let match = document.cookie.match(
    new RegExp("(^| )" + "access_token" + "=([^;]+)")
  );
  if (match) access_token = match[2];
  return access_token;
};

/*compares the currently playing song to the one returned
  from the api call. Returns true if the song is already
  playing*/
const checkSongIsAlreadyPlaying = (song, apiSong) => {
  if (song !== apiSong) return false;
  return true;
};

const isSongInstrumental = async (songId) => {
  let access_token = getAccessTokenFromCookie();
  const res = await axios.get(
    "https://api.spotify.com/v1/audio-features/" + songId,
    {
      headers: { Authorization: "Bearer " + access_token },
    }
  );
  if (res.data.instrumentalness > 0.5) return true;
  return false;
};
