import React from 'react';
import HomeBlock from './components/HomeBlock/HomeBlock';
import Wrap from '../../hoc/Wrap/Wrap';

const Homepage = () => (
  <Wrap>
    <HomeBlock title="Live Schedule" />
    <HomeBlock title="Upcoming Shows" />
  </Wrap>
);

export default Homepage;