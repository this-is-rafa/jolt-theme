import React, { Fragment } from "react";
import Banner from "./components/Banner/Banner";
import MixcloudBanner from "./components/MixcloudBanner/MixcloudBanner";
import Schedule from "./components/Schedule/Schedule";
import Donate from "./components/Donate/Donate";
import UpcomingShows from "./components/UpcomingShows/UpcomingShows";

const homepage = () => (
  <Fragment>
    <Banner />
    <Schedule />
    <MixcloudBanner />
    <Donate />
    <UpcomingShows />
  </Fragment>
);

export default homepage;
