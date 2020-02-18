import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../../actions/actions";
import TitleBlock from "../../../../components/TitleBlock/TitleBlock";

const JoltSettings = window.JoltSettings;
const imageUrl = JoltSettings.URL.template + "/images/";

class Donate extends Component {
  state = {
    donateBtn: undefined,
    donateLink: undefined,
    donateText: undefined,
    donateTitle: undefined
  };

  componentDidMount() {
    this.getData();
  }

  getData() {
    this.props.incrementLoad();
    let _this = this;

    fetch(JoltSettings.URL.acf + "/options/options/donate/")
      .then(function(response) {
        if (!response.ok) {
          _this.props.decrementLoad();
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function(results) {
        _this.setState({
          donateBtn: results.donate.donate_button,
          donateLink: results.donate.donate_link,
          donateText: results.donate.donate_text,
          donateTitle: results.donate.donate_title
        });
        _this.props.decrementLoad();
      })
      .catch(function(error) {
        _this.props.decrementLoad();
        console.log("Could not fetch shows: " + error.message);
      });
  }

  render() {
    if (this.state.donateTitle !== undefined) {
      return (
        <section className="schedules">
          <div className="container">
            <TitleBlock title={this.state.donateTitle} class="donate">
              <div className="row">
                <div className="col-md-6 col-lg-4">
                  <div className="donate">
                    <p className="donate__text">{this.state.donateText}</p>
                  </div>
                  <a
                    className="btn"
                    href={this.state.donateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {this.state.donateBtn}
                  </a>
                </div>
                <img
                  src={imageUrl + "jolt-circle-logo--12x.png"}
                  srcSet={
                    imageUrl +
                    "jolt-circle-logo.png--5x 280w, " +
                    imageUrl +
                    "jolt-circle-logo--10x.png 560w, " +
                    imageUrl +
                    "jolt-circle-logo--12x.png 672w, " +
                    imageUrl +
                    "jolt-circle-logo--15x.png 840w, " +
                    imageUrl +
                    "jolt-circle-logo--20x.png 1120w"
                  }
                  className="donate-bg"
                  alt="Donate background"
                />
              </div>
            </TitleBlock>
          </div>
        </section>
      );
    } else {
      return null;
    }
  }
}

export default connect(null, actionCreators)(Donate);
