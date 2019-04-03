import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SinglePost from './containers/SinglePost/SinglePost';

const JoltSettings = window.JoltSettings;
const initialState = 'initial-state';

const mapDispatchToProps = (dispatch) => {
  return {
    incrementLoad: () => {
      const action = {type: 'LOAD'};
      dispatch(action);
    },
    decrementLoad: () => {
      const action = {type: 'UNLOAD'};
      dispatch(action);
    }
  }
}

class Show extends Component {

  state = {
    show: initialState
  }

  componentDidMount() {
    this.getShow();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.getShow();
    }
  }


  getShow() {
    this.props.incrementLoad();

    let _this = this;
    let url = window.location.href.split('/');
    let slug = url.pop() || url.pop();

    fetch(JoltSettings.URL.api + '/artists?slug=' + slug + '&_embed')
      .then( function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.json();
      })
      .then( function(results) {

        _this.setState({show: results[0]});
        _this.props.decrementLoad();
      })
      .catch(function(error) {
        console.log('Could not fetch shows: ' + error.message);
      });
  }
  
  render() {
    let single = <SinglePost post={this.state.show} key={this.props.location} />;

    return (
      <div>
      {this.state.show && this.state.show.title ? single : <p>Not Found</p>}
      </div>
    );
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Show));