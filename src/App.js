import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Header from './components/Header/Header';
import Main from './containers/Main/Main';
import LoadOverlay from './hoc/LoadOverlay/LoadOverlay';

const JoltSettings = window.JoltSettings;

class App extends Component {

  render() {
    return (
      <div className="App">
        <Helmet>
          <title>{JoltSettings.title}</title>
        </Helmet>
        <Header />
        <Main />
        <LoadOverlay />
      </div>
    );
  }
}

export default App;
