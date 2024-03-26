import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../../actions/actions";
const JoltSettings = window.JoltSettings;

class HomeBanners extends Component {
  state = {
    enable: false,
    banners: undefined,
  };

  componentDidMount() {
    this.getData();
  }

  getData() {
    this.props.incrementLoad();
    let _this = this;

    fetch(JoltSettings.URL.acf + "/options/options/home_banners_low/")
      .then(function(response) {
        if (!response.ok) {
          _this.props.decrementLoad();
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function(results) {
        console.log(results);
        if (results.home_banners_low.enable){
          _this.setState({
            enable: results.home_banners_low.enable,
            banners: results.home_banners_low.banners
          });
        }

        _this.props.decrementLoad();
      })
      .catch(function(error) {
        _this.props.decrementLoad();
        console.log("Could not fetch banners: " + error.message);
      });
  }

  renderAds(banners) {
    return banners.map((banner, i) => {
      return (
        <a
          href={banner.url}
          target="_blank"
          rel="noopener noreferrer"
          className="adbanner__link adbanner__link--low"
          key={i}
        >
          <img className="adbanner__img adbanner__img--square" alt={banner.square.alt} src={banner.square.url} loading="lazy"/>

          <img className="adbanner__img adbanner__img--long" alt={banner.wide.alt} src={banner.wide.url} loading="lazy"/>
        </a>
      );
    });
  }

  render() {
    if (!this.state.enable){
      return null;
    }

    return(
      <div className="container">
        {this.state.banners ? this.renderAds(this.state.banners) : null}
      </div>
    );
  }
};

export default connect(null, actionCreators)(HomeBanners);