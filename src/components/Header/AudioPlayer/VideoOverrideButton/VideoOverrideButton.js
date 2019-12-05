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
      <div
        id="js-video-override"
        onClick={() =>
          props.setTwitchStatus({
            ...props.twitchStatus,
            override: !props.override
          })
        }
        className="play-bar__box play-bar__box--video-override"
      >
        {props.override ? "Live Video" : "Audio Only"}
      </div>
    );
  }

  return null;
};

export default connect(mapStateToProps, actionCreators)(videoOverrideButton);
