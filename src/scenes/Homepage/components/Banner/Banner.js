import React, { Component } from "react";
import { connect } from "react-redux";

const JoltSettings = window.JoltSettings;

const mapDispatchToProps = dispatch => {
  return {
    incrementLoad: () => {
      const action = { type: "LOAD" };
      dispatch(action);
    },
    decrementLoad: () => {
      const action = { type: "UNLOAD" };
      dispatch(action);
    }
  };
};

const mapStateToProps = state => {
  return {
    currentShow: state.currentShow,
    isLive: state.twitchStatus.live,
    override: state.twitchStatus.override
  };
};

class Banner extends Component {
  state = {
    images: []
  };

  componentDidMount() {
    this.getImages();
  }

  getImages() {
    this.props.incrementLoad();
    let _this = this;

    fetch(JoltSettings.URL.acf + "/options/options/slideshow")
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function(results) {
        let allImages = [];

        results.slideshow.forEach(function(single) {
          allImages.push(single);
        });

        _this.setState({
          images: allImages[Math.floor(Math.random() * allImages.length)]
        });
        _this.props.decrementLoad();
      })
      .catch(function(error) {
        console.log("Could not fetch images: " + error.message);
      });
  }

  render() {
    if (!this.props.isLive || this.props.override) {
      if (this.state.images.length === 0) {
        return null;
      }

      let bannerStyle = {
        backgroundImage: `url(${this.state.images.sizes["show-banner"]})`
      };

      if (this.props.currentShow.bannerImage !== undefined) {
        bannerStyle = {
          backgroundImage: `url(${this.props.currentShow.bannerImage})`
        };
      }

      return <section className="banner" style={bannerStyle} />;
    }

    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
