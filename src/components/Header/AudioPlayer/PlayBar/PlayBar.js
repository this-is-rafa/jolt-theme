import React from 'react';
import Icon from '../../../UI/Icon/Icon';

const playBar = () => {
  return (
    <div className="play-bar">
      <div className="play-bar__box play-bar__box--live-indicator">
        Stream On <div className="play-bar__live-dot"></div>
      </div>
      <div id="js-play-pause"className="play-bar__box play-bar__box--play-pause" aria-label="Play / Pause">
        <Icon name="play" />
        <Icon name="stop" />
      </div>
      <div id="js-live-text-box" className="play-bar__box play-bar__box--live-text">
        <span id="js-live-text" className="play-bar__scroller">
          Live Now: Empower Your Essence with Jill Rappaport 9-10pm
        </span>
      </div>
      <div id="js-volume-box" className="play-bar__box play-bar__box--volume-box">
        <Icon name="volume" />
        <Icon name="volume-off" />
      </div>
      <div className="play-bar__box play-bar__box--volume-bar-box">
        <input id="js-volume-range" className="play-bar__volume-range" type="range" />
      </div>
    </div>
  );

}

export default playBar;