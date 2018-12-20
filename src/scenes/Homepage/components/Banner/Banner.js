import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slideshow from './Slideshow/Slideshow';

const JoltSettings = window.JoltSettings;

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

class Banner extends Component {

  state = {
    images: []
  }

  componentDidMount() {
    this.getImages();
  }

  getImages() {
    this.props.incrementLoad();
    let _this = this;

    fetch(JoltSettings.URL.acf + '/options/options/slideshow')
      .then( function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then( function(results) {
        console.log(results);
        let allImages = [];
        
        results.slideshow.forEach(function(single) {
          allImages.push(single);
        });

        _this.setState({images: allImages});
        _this.props.decrementLoad();
      })
      .catch(function(error) {
        console.log('Could not fetch images: ' + error.message);
      });
  }

  render() {
    return(
      <section className="banner">
        <Slideshow images={this.state.images} />
      </section>
    );
  }
}

export default connect(null, mapDispatchToProps)(Banner);