import React, { Component, Fragment } from 'react';
import Nav from './Nav/Nav';
import AudioPlayer from './AudioPlayer/AudioPlayer';
import NavMobile from './NavMobile/NavMobile';
import LiveVideoCheck from './LiveVideoCheck/LiveVideoCheck';

class Header extends Component {
  state = {
    menuOpen: false
  }

  openMenuHandler = () => {
    let menuState = this.state.menuOpen;
    this.setState({menuOpen: !menuState});
  }

  render() {
    return(
      <Fragment>
        <header className="header">
          <Nav menuClick={this.openMenuHandler} open={this.state.menuOpen} />
          <AudioPlayer />
          <NavMobile close={this.openMenuHandler} open={this.state.menuOpen} />
        </header>
        <LiveVideoCheck />
      </Fragment>
    );
  }
}

export default Header;