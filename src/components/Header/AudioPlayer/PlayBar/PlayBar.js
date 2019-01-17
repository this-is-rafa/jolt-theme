import React, { Component } from 'react';
import Icon from '../../../UI/Icon/Icon';
import LiveTextBox from '../LiveTextBox/LiveTextBox';

class PlayBar extends Component {

  state = {
    playing: false,
    volume: true
  }

  audioUrl = 'http://198.27.80.205:5220/stream/&amp;amp;type=m3u';

  componentDidMount() {
    this.volumeRange.addEventListener('change', this.setVolume);
  }

  setVolume = () => {
    this.audio.volume = this.volumeRange.value / 100;
    localStorage.setItem('apVolume', this.volumeRange.value);
  }

  playPauseHandler = () => {
    if (this.audio.paused) {
      let cacheBust = new Date().getTime();
      this.audio.src = this.audioUrl + '&' + cacheBust;
      this.audio.play();
      this.setState({playing: true});
    } else {
      this.audio.pause();
      this.audio.src = '';
      this.setState({playing: false});
    }
  }

  render() {
    return (
      <div className="play-bar">
        <audio id="js-player" 
          className="audio-player"
          preload="metadata"
          src="http://198.27.80.205:5220/stream/&amp;amp;type=m3u"
          ref={audio => {this.audio = audio}}
        >
          Your browser can't play this. Try <a href="https://www.getfirefox.com">Firefox browser</a>.
          Direct link to stream: <a href="http://198.27.80.205:5220/stream/&amp;type=m3u">link</a>
        </audio>
        <div className="play-bar__box play-bar__box--live-indicator">
          Stream On <div className="play-bar__live-dot"></div>
        </div>
        <div onClick={this.playPauseHandler} className="play-bar__box play-bar__box--play-pause" aria-label="Play / Pause">
          { this.state.playing ? <Icon name="stop" parentClass="play-bar" /> : <Icon name="play" parentClass="play-bar" /> }
        </div>
        <LiveTextBox />
        <div id="js-volume-box" className="play-bar__box play-bar__box--volume-box">
          <Icon name="volume" parentClass="play-bar" />
        </div>
        <div className="play-bar__box play-bar__box--volume-bar-box">
          <input ref={volumeRange => (this.volumeRange = volumeRange)} className="play-bar__volume-range" type="range" />
        </div>
      </div>
    );
  }

}

export default PlayBar;