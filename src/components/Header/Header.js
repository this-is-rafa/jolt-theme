import React, { Component } from 'react';
import Nav from './Nav/Nav';
import AudioPlayer from './AudioPlayer/AudioPlayer';
import NavMobile from './NavMobile/NavMobile';

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
      <header className="header">
        <Nav menuClick={this.openMenuHandler} open={this.state.menuOpen} />
        <AudioPlayer />
        <NavMobile open={this.state.menuOpen} />
      </header>
    );
  }
}

export default Header;