import { takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";

//worker saga
export function* songSaga() {
  let access_token = getAccessTokenFromCookie();
  let headerParams = { Authorization: "Bearer " + access_token };

  try {
    console.log("test song saga");
    const res = yield call(
      axios.get,
      "https://api.spotify.com/v1/me/player/currently-playing",
      { headers: headerParams }
    );
  } catch (err) {}
}

//watcher saga
export function* watchCreateSaga() {
  console.log("redux-saga is running");
  yield takeEvery("SET_CURRENT_SONG");
}

export default function* rootSaga() {
  yield* [watchCreateSaga()];
}

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
