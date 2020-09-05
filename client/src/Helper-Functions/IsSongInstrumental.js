import axios from "axios";
import getAccessTokenFromCookie from "./CookieFunctions";

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

export default isSongInstrumental;
