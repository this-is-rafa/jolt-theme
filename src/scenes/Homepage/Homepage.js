import React from 'react';
import UpcomingShows from './components/UpcomingShows/UpcomingShows';
import Schedule from './components/Schedule/Schedule';
import Wrap from '../../hoc/Wrap/Wrap';

const homepage = () => (
  <Wrap>
    <Schedule />
    <UpcomingShows />
  </Wrap>
);

export default homepage;