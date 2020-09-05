import { combineReducers } from "redux";
import SongStateReducer from "./SongStateReducer";

//add created reducers to object in export
export default combineReducers({ song: SongStateReducer });
