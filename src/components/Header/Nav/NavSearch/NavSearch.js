import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../../actions/actions";
import { withRouter } from "react-router-dom";
import Icon from "../../../UI/Icon/Icon";
import NavSearchResults from "./NavSearchResults/NavSearchResults";

const JoltSettings = window.JoltSettings;
const searchUrl = JoltSettings.path + "shows/";

const mapStateToProps = state => {
  return {
    searchResults: state.search.results
  };
};

class NavSearch extends Component {
  state = {
    value: ""
  };

  handleChange(event) {
    this.setState({ value: event.target.value }, () => {
      if (this.state.value.length > 2) {
        this.props.getSearch(this.state.value);
      } else {
        this.props.setSearchQuery(this.state.value);
      }
    });
  }

  handleSubmit = event => {
    this.props.setSearchQuery(this.state.value);
    this.searchInput.blur();
    this.searchInput.classList.remove("nav-search__input--active");
    this.props.history.push(searchUrl);
    event.preventDefault();
  };

  handleExpand() {
    this.setState({ value: "" }, () => this.props.getSearch(this.state.value));
    this.searchInput.focus();
    this.searchInput.classList.add("nav-search__input--active");
  }

  handleClickResult = url => {
    this.props.history.push(url);
    this.props.getSearch("");
  };

  render() {
    let searchResults = null;
    if (this.props.searchResults.length > 0 && this.state.value.length > 2) {
      searchResults = (
        <NavSearchResults
          results={this.props.searchResults}
          clicked={this.handleClickResult}
        />
      );
    }

    return (
      <div className="nav-search">
        <button
          className="nav-search__btn"
          onClick={this.handleExpand.bind(this)}
        >
          <Icon parentClass="nav-search" name="search" />
        </button>
        <form className="nav-search__form" onSubmit={this.handleSubmit}>
          <input
            className="nav-search__input"
            type="text"
            value={this.state.value}
            ref={searchInput => (this.searchInput = searchInput)}
            onChange={this.handleChange.bind(this)}
          />
          {searchResults}
        </form>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    actionCreators
  )(NavSearch)
);
