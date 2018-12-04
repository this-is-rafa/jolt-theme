import React, { Component } from 'react';
//import { Provider } from 'react-redux';

import Header from './components/Header/Header';
import Main from './containers/Main/Main';
import LoadOverlay from './hoc/LoadOverlay/LoadOverlay';




class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Main />
        <LoadOverlay />
      </div>
    );
  }
}

export default App;
