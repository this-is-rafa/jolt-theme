import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";
import * as actionCreators from "../../../actions/actions";

const mapStateToProps = state => {
  return {
    audioStatus: state.audioStatus,
    twitchStatus: state.twitchStatus
  };
};

class Twitch extends Component {
  componentWillUnmount() {
    this.props.setTwitchStatus({
      ...this.props.twitchStatus,
      override: true,
      player: null
    });
  }

  pauseHandler = () => {
    if (!this.props.audioElement.current.paused) {
      this.props.audioElement.current.pause();
      this.props.audioElement.current.src = "";
      this.props.setAudioStatus({
        ...this.props.audioStatus,
        playing: false
      });
    }
  };

  setPlayerObject = twitchPlayer => {
    this.props.setTwitchStatus({
      ...this.props.twitchStatus,
      player: twitchPlayer
    });
  };

  render() {
    return (
      <section className="video-embed">
        <ReactTwitchEmbedVideo
          channel="joltradio"
          targetClass="twitch-embed"
          layout="video"
          onVideoPlay={this.pauseHandler}
          onPlayerReady={this.setPlayerObject}
          theme="dark"
          autoplay={false}
        />
      </section>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Twitch);
