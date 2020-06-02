import React from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "../../scenes/Homepage/Homepage";
import Show from "../../scenes/Show/Show";
import CatList from "../../scenes/CatList/CatList";
import ShowsList from "../../scenes/ShowsList/ShowsList";
import Page from "../../scenes/Page/Page";

const JoltSettings = window.JoltSettings;

const main = () => (
  <main className="c-wrap">
    <Switch>
      <Route exact path={JoltSettings.path} component={Homepage} />
      <Route exact path={JoltSettings.path + "artist/:slug"} component={Show} />
      <Route
        exact
        path={JoltSettings.path + "artist-category/:slug"}
        component={CatList}
      />
      <Route exact path={JoltSettings.path + "shows"} component={ShowsList} />
      <Route exact path={JoltSettings.path + ":slug"} component={Page} />
    </Switch>
  </main>
);

export default main;
