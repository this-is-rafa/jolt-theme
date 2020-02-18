import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";
import * as actionCreators from "../../../actions/actions";

const mapStateToProps = state => {
  return {
    audioStatus: state.audioStatus
  };
};

class Twitch extends Component {
  pauseHandler = () => {
    if (!this.props.audioElement.current.paused) {
      this.props.audioElement.current.pause();
      this.props.audioElement.current.src = "";
      this.props.setAudioStatus({
        ...this.props.audioStatus,
        playing: false
      });
    }
    console.log('pause handler');
  };

  render() {
    return (
      <section className="video-embed">
        <ReactTwitchEmbedVideo
          channel="joltradio"
          targetClass="twitch-embed"
          layout="video"
          onVideoPlay={this.pauseHandler}
          theme="dark"
          autoplay={false}
        />
      </section>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Twitch);
