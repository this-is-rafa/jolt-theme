import React, { Component, Fragment } from "react";
import Nav from "./Nav/Nav";
import PlayBar from "./PlayBar/PlayBar";
import NavMobile from "./NavMobile/NavMobile";
import LiveVideoCheck from "./LiveVideoCheck/LiveVideoCheck";

class Header extends Component {
  state = {
    menuOpen: false
  };

  audioRef = React.createRef();

  openMenuHandler = () => {
    let menuState = this.state.menuOpen;
    this.setState({ menuOpen: !menuState });
  };

  render() {
    return (
      <Fragment>
        <audio
          id="js-player"
          className="audio-player"
          preload="metadata"
          src="http://198.27.80.205:5220/stream/&amp;amp;type=m3u"
          ref={this.audioRef}
        >
          Your browser can't play this. Try
          <a href="https://www.getfirefox.com">Firefox browser</a>. Direct link
          to stream:
          <a href="http://198.27.80.205:5220/stream/&amp;type=m3u">link</a>
        </audio>
        {console.log(this.audioRef)}
        <header className="header">
          <Nav menuClick={this.openMenuHandler} open={this.state.menuOpen} />
          <PlayBar audioElement={this.audioRef} />
          <NavMobile close={this.openMenuHandler} open={this.state.menuOpen} />
        </header>
        <LiveVideoCheck audioElement={this.audioRef} />
      </Fragment>
    );
  }
}

export default Header;
