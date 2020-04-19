import { GET_GENIUS_URL, GET_NOW_PLAYING, GET_LYRICS } from "../Context/Types";

const State = (props) => {
  const initialState = {
    loggedIn: false,
    user: {},
    nowPlaying: { name: "Not Checked", albumArt: "", artist: "" },
    lyrics: "",
    geniusUrl: null,
  };
};

const [state, dispatch] = useReducer(Reducer, initialState);

return (
  <Context.Provider
    value={{
      loggedIn: state.loggedIn,
      nowPlaying: state.nowPlaying,
      lyrics: state.lyrics,
      geniusUrl: state.geniusUrl,
    }}
  >
    {props.children}
  </Context.Provider>
);

export default State;
