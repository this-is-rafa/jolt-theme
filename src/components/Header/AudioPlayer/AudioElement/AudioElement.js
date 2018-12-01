import React, { Component } from 'react';

class AudioElement extends Component {

  render() {
    return (
      <audio id="js-player" 
        className="audio-player"
        preload="metadata"
        src="http://198.27.80.205:5220/stream/&amp;amp;type=m3u"
      >
        Your browser can't play this. Try <a href="https://www.getfirefox.com">Firefox browser</a>.
        Direct link to stream: <a href="http://198.27.80.205:5220/stream/&amp;type=m3u">link</a>
    </audio>
    );
  }
}

export default AudioElement;