import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from '../../scenes/Homepage/Homepage';

const JoltSettings = window.JoltSettings;

const Main = () => (
  <main className='c-wrap'>
    <Switch>
      <Route exact path={JoltSettings.path} component={Homepage}/>
    </Switch>
  </main>
)

export default Main;