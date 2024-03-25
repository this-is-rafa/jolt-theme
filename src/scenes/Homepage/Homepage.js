import React, { Fragment } from "react";
import Banner from "./components/Banner/Banner";
import AdBanner from "./components/AdBanner/AdBanner";
import Schedule from "./components/Schedule/Schedule";
import FeaturedSets from "./components/FeaturedSets/FeaturedSets";
import YTBanner from "./components/YTBanner/YTBanner";
import Donate from "./components/Donate/Donate";
import UpcomingShows from "./components/UpcomingShows/UpcomingShows";

const homepage = () => (
  <Fragment>
    <Banner />
    <AdBanner />
    <Schedule />
    <FeaturedSets />
    <YTBanner />
    <Donate />
    <UpcomingShows />
  </Fragment>
);

export default homepage;
