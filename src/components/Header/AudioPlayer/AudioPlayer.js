import React from 'react';
import AudioElement from './AudioElement/AudioElement';
import PlayBar from './PlayBar/PlayBar';
import Wrap from '../../../hoc/Wrap/Wrap';

const AudioPlayer = () => (
  <Wrap>
    <AudioElement />
    <PlayBar />
  </Wrap>
);

export default AudioPlayer;