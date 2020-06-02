import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SinglePage from "./containers/SinglePage/SinglePage";

const JoltSettings = window.JoltSettings;
const initialState = "initial-state";

const mapDispatchToProps = (dispatch) => {
  return {
    incrementLoad: () => {
      const action = { type: "LOAD" };
      dispatch(action);
    },
    decrementLoad: () => {
      const action = { type: "UNLOAD" };
      dispatch(action);
    },
  };
};

class Page extends Component {
  state = {
    page: initialState,
  };

  componentDidMount() {
    this.getPage();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.getPage();
    }
  }

  getPage() {
    this.props.incrementLoad();

    let _this = this;
    let url = window.location.href.split("/");
    let slug = url.pop() || url.pop();

    fetch(JoltSettings.URL.api + "/pages?slug=" + slug + "&_embed")
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function (results) {
        _this.setState({ page: results[0] });
        _this.props.decrementLoad();
      })
      .catch(function (error) {
        console.log("Could not fetch page: " + error.message);
      });
  }

  render() {
    let single = (
      <SinglePage page={this.state.page} key={this.props.location} />
    );

    return (
      <div>
        {this.state.page && this.state.page.title ? single : <p>Not Found</p>}
      </div>
    );
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Page));
