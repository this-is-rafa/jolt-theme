import React from 'react';
import Nav from './Nav/Nav';
import AudioPlayer from './AudioPlayer/AudioPlayer';

const Header = () => (
  <header className="header">
    <Nav />
    <AudioPlayer />
  </header>
)

export default Header;