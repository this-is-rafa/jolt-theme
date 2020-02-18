import React, { Component } from "react";
import LiveTextBox from "./LiveTextBox/LiveTextBox";
import PlayButton from "./PlayButton/PlayButton";
import VideoOverrideButton from "./VideoOverrideButton/VideoOverrideButton";
import Volume from "./Volume/Volume";
import { connect } from "react-redux";
import * as actionCreators from "../../../actions/actions";

const mapStateToProps = state => {
  return {
    audioStatus: state.audioStatus,
    playing: state.audioStatus.playing
  };
};

class PlayBar extends Component {
  state = {
    playing: false,
    volume: true
  };

  audioUrl = "http://198.27.80.205:5220/stream/&amp;amp;type=m3u";

  volumeRange = React.createRef();

  componentDidMount() {
    this.initialVolume();
    this.volumeRange.current.addEventListener("change", this.setVolume);
  }

  initialVolume = () => {
    const volume = Number(localStorage.getItem("apVolume")) || 100;
    if (volume < 1) {
      this.volumeRange.current.value = 100;
    } else {
      this.volumeRange.current.value = volume;
    }
    this.setVolume();
  };

  setVolume = () => {
    this.props.audioElement.current.volume =
      this.volumeRange.current.value / 100;
    localStorage.setItem("apVolume", this.volumeRange.current.value);
  };

  playPauseHandler = () => {
    if (this.props.audioElement.current.paused) {
      let cacheBust = new Date().getTime();
      this.props.audioElement.current.src = this.audioUrl + "&" + cacheBust;
      this.props.audioElement.current.play();
      this.props.setAudioStatus({
        ...this.props.audioStatus,
        playing: true
      });
    } else {
      this.props.audioElement.current.pause();
      this.props.audioElement.current.src = "";
      this.props.setAudioStatus({
        ...this.props.audioStatus,
        playing: false
      });
    }
  };

  render() {
    return (
      <div className="play-bar">
        <div className="play-bar__box play-bar__box--live-indicator">
          Stream On <div className="play-bar__live-dot"></div>
        </div>
        <VideoOverrideButton />
        <PlayButton
          clicked={() => this.playPauseHandler()}
          audioStatus={this.props.playing}
        />
        <LiveTextBox />
        <Volume ref={this.volumeRange} />
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(PlayBar);
