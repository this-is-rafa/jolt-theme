import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Icon from '../../../UI/Icon/Icon';
//import AudioElement from '../AudioElement/AudioElement';


class PlayBar extends Component {

  state = {
    playing: false,
    volume: true
  }

  //audio = React.createRef();
  audioUrl = 'http://198.27.80.205:5220/stream/&amp;amp;type=m3u';

  componentDidMount() {
    this.volumeRange.addEventListener('change', this.setVolume);
    //setTimeout(this.scrollTextHandler, 1000);
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

  scrollTextHandler = () => {
    //Scrolling Text
    const liveText = findDOMNode(this.refs.liveText);
    console.log(liveText);
    const liveTextBox = findDOMNode(this.refs.liveTextBox);
    
    let liveTextInfo = liveText.getBoundingClientRect();
    let liveTextBoxInfo = liveTextBox.getBoundingClientRect();

    let liveTextW = liveTextInfo.width;
    let liveTextBoxW = liveTextBoxInfo.width;
    

    scrollingText(liveTextW, liveTextBoxW);
    // window.addEventListener('resize', function() {
    //   liveTextW = $liveText.width();
    //   liveTextBoxW = $('#js-live-text-box').width();
    //   scrollingText(liveTextW, liveTextBoxW);
    // });

    function scrollingText(liveTextW, liveTextBoxW) {
      if ( liveTextW > (liveTextBoxW - 4) ) {
          console.log(liveText);
          let indent = 0;
          let leftMax = true;

          const scroller = liveText;
          scroller.scroll = function() {
            if (leftMax) {
              if ( ( liveTextW - Math.abs(indent) ) > liveTextBoxW ) {
                indent = indent - 1;
                liveText.style.textIndent = indent;
              } else {
                leftMax = false;
              }
            } else {
              if ( ( liveTextW + indent ) < liveTextW ) {
                indent = indent + 1;
                liveText.style.textIndent = indent;
              } else {
                leftMax = true;
              }
            }
          }
          console.log(liveTextBoxW + ' ' + liveTextW + ' ' + indent);
          setInterval(scroller.scroll, 1000/24);

      }
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
        <div ref="liveTextBox" className="play-bar__box play-bar__box--live-text">
          <span ref="liveText" className="play-bar__scroller">
            Live Now: Empower Your Essence with Jill Rappaport 9-10pm
          </span>
        </div>
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