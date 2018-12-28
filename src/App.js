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
          <meta property="og:title" content={JoltSettings.title} />
          <meta name="twitter:title" content={JoltSettings.title} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={JoltSettings.URL.root} />
          <meta property="og:site_name" content={JoltSettings.title} />
          <meta property="og:image" content={JoltSettings.URL.template + '/screenshot.png'} />
          <meta property="og:image:height" content="1920" />
          <meta property="og:image:width" content="1080" />
          <meta property="og:description" content="Jolt is an online radio station based in Miami. Supporting local, national, and international independent artists and producers." />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:image" content={JoltSettings.URL.template + '/screenshot.png'} />
          <meta name="twitter:site" content="@joltradio" />
          <meta name="twitter:description" content="Jolt is an online radio station based in Miami. Supporting local, national, and international independent artists and producers." />
        </Helmet>
        <Header />
        <Main />
        <LoadOverlay />
      </div>
    );
  }
}

export default App;
