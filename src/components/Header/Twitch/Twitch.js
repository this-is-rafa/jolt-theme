import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";

class Twitch extends Component {
  render() {
    return (
      <section className="video-embed">
        <ReactTwitchEmbedVideo
          channel="joltradio"
          width="100%"
          height="100%"
          layout="video"
          theme="dark"
        />
      </section>
    );
  }
}

export default Twitch;
