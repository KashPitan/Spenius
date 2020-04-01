import React, { Component } from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import { getLyrics } from "genius-lyrics-api";
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;

    if (token) {
      spotifyApi.setAccessToken(token);
    }
    
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '', artist: '' },
      lyrics : ""
    }
  }

  //auto loads lyrics and current track when the page opens
  componentDidMount(){
    this.updateLoop();
  }

  updateLoop(){
    setInterval(() => {
     this.getNowPlaying();
    }, 5000);
  };

  getLyrics(){
    const options = {
      apiKey:"E5Jz1UVbZwvaShjHp2a-gPNXRDiTKzFNA_AUH331BUnM7LfmD6p_qpJ2EZ4e8qoh",
      title: this.state.nowPlaying.name || "",
      artist: this.state.nowPlaying.artist || "",
      optimizeQuery:true
    };

    getLyrics(options).then(lyrics=> {
      this.setState({
        lyrics:lyrics
      });
      });
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
    .then((response) =>{
      this.setState({
        nowPlaying:{
          name: response.item.name,
          albumArt: response.item.album.images[0].url,
          artist: response.item.artists[0].name
        } 
      });
      const options = {
        apiKey:"E5Jz1UVbZwvaShjHp2a-gPNXRDiTKzFNA_AUH331BUnM7LfmD6p_qpJ2EZ4e8qoh",
        title: this.state.nowPlaying.name || "",
        artist: this.state.nowPlaying.artist || "",
        optimizeQuery:true
      };

      //delay helps stop the api call from getting filler lyrics
      setTimeout({},2000);
      getLyrics(options).then(lyrics=> {
        this.setState({
          lyrics:lyrics
        });
        });
    });
       
  };

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }
  render() {
    return (
      <div className="App">
        <a href='http://localhost:8888' > Login to Spotify </a>
        
        <p>Now Playing: { this.state.nowPlaying.name }</p>
        <p>By: {this.state.nowPlaying.artist}</p>
        
        <div>
        <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
        </div>

        { this.state.loggedIn &&
        <button onClick={() => this.getLyrics()}>
          Update Lyrics
        </button>
        }
        <div id="lyrics">
          <p id="lyrics-text">{this.state.lyrics}</p>
        </div>

      </div>
    );
  }
}

export default App;
