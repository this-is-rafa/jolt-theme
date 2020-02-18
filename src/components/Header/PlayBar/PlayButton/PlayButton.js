import React from "react";
import Icon from "../../../UI/Icon/Icon";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    isLive: state.twitchStatus.live,
    override: state.twitchStatus.override
  };
};

const playButton = props => {
  if (true || !props.isLive || props.override) {
    return (
      <div
        onClick={props.clicked}
        className="play-bar__box play-bar__box--play-pause"
        aria-label="Play / Pause"
      >
        {props.audioStatus ? (
          <Icon name="stop" parentClass="play-bar" />
        ) : (
          <Icon name="play" parentClass="play-bar" />
        )}
      </div>
    );
  }
};

export default connect(mapStateToProps, null)(playButton);
