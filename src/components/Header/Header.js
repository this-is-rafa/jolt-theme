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
          src="https://usa12.fastcast4u.com/proxy/joltradi?mp=/1"
          ref={this.audioRef}
        >
          Your browser can't play this. Try
          <a href="https://www.getfirefox.com">Firefox browser</a>. Direct link
          to stream:
          <a href="https://usa12.fastcast4u.com/proxy/joltradi?mp=/1">link</a>
        </audio>
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
