import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../actions/actions";
import Icon from "../../../components/UI/Icon/Icon";

const mapStateToProps = state => {
  return {
    searchQuery: state.search.query,
    searchResults: state.search.results,
    postList: state.postList
  };
};

class ShowsSearch extends Component {
  state = {
    value: ""
  };

  componentDidMount() {
    if (this.props.searchQuery.length > 0) {
      this.setState({ value: this.props.searchQuery });
      this.props.getSearch(this.props.searchQuery);
    }
  }

  componentWillUnmount() {
    this.props.setSearchQuery(this.state.value);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ value: this.props.searchQuery });
    }
    if (this.props.searchQuery.length > 2) {
      if (prevProps.searchResults !== this.props.searchResults) {
        this.props.setPostList({
          ...this.props.postList,
          getPosts: false
        });
      }
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value }, () => {
      if (this.state.value.length > 2) {
        this.props.getSearch(this.state.value);
      } else {
        this.props.setPostList({
          ...this.props.postList,
          getPosts: true
        });
        this.props.setSearchResults([]);
        this.props.setSearchQuery(this.state.value);
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleClear = () => {
    this.props.setSearchResults([]);
    this.props.setSearchQuery("");
    this.props.setPostList({
      ...this.props.postList,
      getPosts: true
    });
  };

  render() {
    return (
      <div className="show-search">
        <form className="show-search__form" onSubmit={this.handleSubmit}>
          <input
            type="search"
            className="show-search__input"
            value={this.state.value}
            ref={searchInput => (this.searchInput = searchInput)}
            onChange={this.handleChange.bind(this)}
            placeholder="Search shows..."
          />
          {this.props.searchQuery.length > 0 ? (
            <button className="show-search__clear" onClick={this.handleClear}>
              <Icon name="x" parentClass="show-search" />
            </button>
          ) : null}
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(ShowsSearch);
