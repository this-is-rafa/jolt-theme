import React, { Fragment } from "react";
import UpcomingShows from "./components/UpcomingShows/UpcomingShows";
import Banner from "./components/Banner/Banner";
import Schedule from "./components/Schedule/Schedule";
import Donate from "./components/Donate/Donate";

const homepage = () => (
  <Fragment>
    <Banner />
    <Schedule />
    <Donate />
    <UpcomingShows />
  </Fragment>
);

export default homepage;
