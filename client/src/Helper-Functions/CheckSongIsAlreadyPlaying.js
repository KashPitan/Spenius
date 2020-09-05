/*compares the currently playing song to the one returned
  from the api call. Returns true if the song is already
  playing*/
const checkSongIsAlreadyPlaying = (song, apiSong) => {
  if (song !== apiSong) return false;
  return true;
};

export default checkSongIsAlreadyPlaying;
