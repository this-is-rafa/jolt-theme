import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../../actions/actions";

const mapStateToProps = state => {
  return {
    twitchStatus: state.twitchStatus,
    isLive: state.twitchStatus.live,
    override: state.twitchStatus.override
  };
};

const videoOverrideButton = props => {
  if (props.isLive) {
    return (
      <button
        id="js-video-override"
        onClick={() =>
          props.setTwitchStatus({
            ...props.twitchStatus,
            override: !props.override
          })
        }
        className="play-bar__btn"
      >
        {props.override ? "Show Video" : "Hide Video"}
      </button>
    );
  }

  return null;
};

export default connect(mapStateToProps, actionCreators)(videoOverrideButton);
