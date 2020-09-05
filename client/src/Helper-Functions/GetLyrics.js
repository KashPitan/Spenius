import axios from "axios";

const getLyrics = async (geniusUrl) => {
  try {
    let response = await axios.get("http://localhost:8888/lyrics/scrape", {
      params: {
        url: geniusUrl,
      },
    });
    setLyrics(response.data);
  } catch (error) {}
};
