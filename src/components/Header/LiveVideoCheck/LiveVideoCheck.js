import React, { Component } from "react";
import { connect } from "react-redux";
import Twitch from "../Twitch/Twitch";
import * as actionCreators from "../../../actions/actions";

const JoltSettings = window.JoltSettings;

const mapStateToProps = state => {
  return {
    twitchStatus: state.twitchStatus,
    isLive: state.twitchStatus.live,
    override: state.twitchStatus.override
  };
};

class LiveVideoCheck extends Component {
  componentDidMount() {
    this.checkTwitchLive();
    this.twitchInterval = this.intervalTrigger();
  }

  componentWillUnmount() {
    clearInterval(this.twitchInterval);
  }

  intervalTrigger() {
    setInterval(() => {
      this.checkTwitchLive();
    }, 15000);
  }

  checkTwitchLive() {
    let _this = this;

    fetch(JoltSettings.URL.api + "/jolt-twitch/")
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function(results) {
        if (results !== null) {
          _this.props.setTwitchStatus({
            ..._this.props.twitchStatus,
            live: results.live
          });
        }
      })
      .catch(function(error) {
        console.log("Could not fetch twitch api: " + error.message);
      });
  }

  render() {
    if (!this.props.override && this.props.isLive) {
      return <Twitch audioElement={this.props.audioElement} />;
    }

    return null;
  }
}

export default connect(mapStateToProps, actionCreators)(LiveVideoCheck);
