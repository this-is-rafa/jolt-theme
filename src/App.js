import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import * as actionCreators from './actions/actions';
import Header from './components/Header/Header';
import Main from './containers/Main/Main';
import LoadOverlay from './hoc/LoadOverlay/LoadOverlay';

const JoltSettings = window.JoltSettings;

class App extends Component {
  componentWillMount() {
    this.props.getEvents();
  }

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

export default withRouter( connect(null, actionCreators)(App) );