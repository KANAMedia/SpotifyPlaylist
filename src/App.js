import React, { Component } from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import jsonp from 'jsonp'

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
      playlists: [],
      playlistTracks: []
    }
  }

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

  getPlaylists(){
    spotifyApi.getUserPlaylists()
      .then((response) => {
        this.setState({
          playlists: response
        })
      })
  }

  getPlaylistTitels(playlistTracks) {
    spotifyApi.getPlaylistTracks(playlistTracks)
    .then((response) => {
      this.setState({
        playlistTracks: response
      })
    })
  }

searchiTunes(title) {
  console.log('im, here')
  jsonp(`https://itunes.apple.com/search?term=${title}`, null, (err, data) => {
    if(err){
        console.log(err.message)
    }else {
        console.log(data)
    }
})
}

  render() {
    console.log(this.state);
    return (
      <div className="App">
      <a href='http://localhost:8888' > Login to Spotify </a>
      <button onClick={() => this.getPlaylists()}>Get Playlists</button>
      <ul>
      {this.state.playlists.items ? this.state.playlists.items.map(playlist => (
        <button 
        onClick={() => this.getPlaylistTitels(playlist.id)}
        >
        {playlist.name}
        </button>
      )) : <li>Playlists</li> }
      </ul>
      
      {this.state.playlistTracks.items ? this.state.playlistTracks.items.map(track => (
        <ul>
        <li>{track.track.name} --> {this.searchiTunes(track.track.name)}</li>
        </ul>
      )) : <p>PlaylistTracks</p>}

      <button onClick={() => this.searchiTunes()}> Search iTunes</button>
      </div>
    );
  }
}

export default App;
