import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SingleNews from "./containers/SingleNews/SingleNews";

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

class News extends Component {
  state = {
    news: initialState,
  };

  componentDidMount() {
    this.getNews();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.getNews();
    }
  }

  getNews() {
    this.props.incrementLoad();

    let _this = this;
    let url = window.location.href.split("/");
    let slug = url.pop() || url.pop();

    fetch(JoltSettings.URL.api + "/news?slug=" + slug + "&_embed")
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function (results) {
        _this.setState({ news: results[0] });
        _this.props.decrementLoad();
      })
      .catch(function (error) {
        console.log("Could not fetch news: " + error.message);
      });
  }

  render() {
    let single = (
      <SingleNews news={this.state.news} key={this.props.location} />
    );

    return (
      <div>
        {this.state.news && this.state.news.title ? single : <p>Not Found</p>}
      </div>
    );
  }
}

export default withRouter(connect(null, mapDispatchToProps)(News));
