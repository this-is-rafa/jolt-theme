import React, { Fragment } from "react";
import Icon from "../../../UI/Icon/Icon";

const volume = React.forwardRef((props, volumeRange) => {
  return (
    <Fragment>
      <div
        id="js-volume-box"
        className="play-bar__box play-bar__box--volume-box"
      >
        <Icon name="volume" parentClass="play-bar" />
      </div>
      <div className="play-bar__box play-bar__box--volume-bar-box">
        <input
          ref={volumeRange}
          className="play-bar__volume-range"
          type="range"
        />
      </div>
    </Fragment>
  );
});

export default volume;
