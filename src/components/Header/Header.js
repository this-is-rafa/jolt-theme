import React from 'react';
import Nav from './Nav/Nav';
import AudioPlayer from './AudioPlayer/AudioPlayer';

const header = () => (
  <header className="header">
    <Nav />
    <AudioPlayer />
  </header>
)

export default header;