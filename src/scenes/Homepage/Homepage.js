import React from 'react';
import UpcomingShows from './components/UpcomingShows/UpcomingShows';
import Banner from './components/Banner/Banner';
import Schedule from './components/Schedule/Schedule';
import Wrap from '../../hoc/Wrap/Wrap';

const homepage = () => (
  <Wrap>
    <Banner />
    <Schedule />
    <UpcomingShows />
  </Wrap>
);

export default homepage;