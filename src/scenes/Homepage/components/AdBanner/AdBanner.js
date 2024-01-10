import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../../actions/actions";
import TitleBlock from "../../../../components/TitleBlock/TitleBlock";
const JoltSettings = window.JoltSettings;

class AdBanner extends Component {
  state = {
    adsEnable: false,
    adTitleBlock: "whatever",
    adsArray: undefined,
  };

  componentDidMount() {
    this.getData();
  }

  getData() {
    this.props.incrementLoad();
    let _this = this;

    fetch(JoltSettings.URL.acf + "/options/options/home_ads/")
      .then(function(response) {
        if (!response.ok) {
          _this.props.decrementLoad();
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function(results) {
        if (results.home_ads.adEnable){
          _this.setState({
            adEnable: results.home_ads.adEnable,
            adTitleBlock: results.home_ads.adHomeTitle,
            adsArray: results.home_ads.adHome
          });
        }

        _this.props.decrementLoad();
      })
      .catch(function(error) {
        _this.props.decrementLoad();
        console.log("Could not fetch shows: " + error.message);
      });
  }

  renderAds(ads) {
    return ads.map((ad, i) => {
      console.log(ad);
      return (
        <a
          href={ad.url}
          target="_blank"
          rel="noopener noreferrer"
          className="adbanner__link"
          key={i}
        >
          <img className="adbanner__img adbanner__img--square" alt={ad.ad_square.alt} src={ad.ad_square.url} />

          <img className="adbanner__img adbanner__img--long" alt={ad.ad_wide.alt} src={ad.ad_wide.url} />
        </a>
      );
    });
  }

  render() {
    if (!this.state.adEnable){
      return null;
    }

    return(
      <section className="adbanner">
        <div className="container">
          <TitleBlock title={this.state.adTitleBlock}>
          {this.state.adsArray ? this.renderAds(this.state.adsArray) : null}
          </TitleBlock>
        </div>
      </section>
    );
  }
};

export default connect(null, actionCreators)(AdBanner);