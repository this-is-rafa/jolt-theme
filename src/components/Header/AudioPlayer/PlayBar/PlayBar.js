import React, { Component } from 'react';
import LiveTextBox from '../LiveTextBox/LiveTextBox';
import PlayButton from '../PlayButton/PlayButton';
import VideoOverrideButton from '../VideoOverrideButton/VideoOverrideButton';
import Volume from '../Volume/Volume';

class PlayBar extends Component {

  state = {
    playing: false,
    volume: true
  }

  audioUrl = 'http://198.27.80.205:5220/stream/&amp;amp;type=m3u';

  volumeRange = React.createRef();

  componentDidMount() {
      this.initialVolume();
      this.volumeRange.current.addEventListener('change', this.setVolume);
  }

  initialVolume = () => {
    const volume = Number( localStorage.getItem('apVolume') ) || 100;
    if ( volume < 1 ) {
      this.volumeRange.current.value = 100;
    } else {
      this.volumeRange.current.value = volume;
    }
    this.setVolume();
  }

  setVolume = () => {
    this.audio.volume = this.volumeRange.current.value / 100;
    localStorage.setItem('apVolume', this.volumeRange.current.value);
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
        <PlayButton clicked={() => this.playPauseHandler()} playStatus={this.state.playing}/>
        <LiveTextBox />
        <VideoOverrideButton />
        <Volume ref={this.volumeRange} />
      </div>
    );
  }

}

export default PlayBar;