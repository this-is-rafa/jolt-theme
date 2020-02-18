import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/actions";
import TitleBlock from "../../components/TitleBlock/TitleBlock";
import PostList from "../../components/PostList/PostList";
import Button from "../../components/UI/Button/Button";
import ShowsSearch from "./ShowsSearch/ShowsSearch";

const JoltSettings = window.JoltSettings;
const baseUrl = JoltSettings.path + "artist/";

const mapStateToProps = state => {
  return {
    postList: state.postList,
    searchResults: state.search.results,
    searchQuery: state.search.query,
    searchStatus: state.search.searching
  };
};

class ShowsList extends Component {
  componentDidMount() {
    if (this.props.postList.posts.length < 1) {
      this.getShows();
    }
  }

  getShows() {
    if (!this.props.postList.getPosts) return;
    this.props.incrementLoad();
    this.props.setPostList({
      ...this.props.postList,
      page: this.props.postList.page + 1
    });
    let allPosts = this.props.postList.posts;
    let totalPages;
    let _this = this;

    fetch(
      JoltSettings.URL.api +
        "/artists/?_embed&per_page=12&orderby=title&order=asc&page=" +
        _this.props.postList.page
    )
      .then(function(response) {
        for (var entry of response.headers.entries()) {
          if (entry[0] === "x-wp-totalpages") {
            totalPages = entry[1];
          }

          if (_this.props.postList.page > totalPages) {
            _this.props.setPostList({
              ..._this.props.postList,
              getPosts: false
            });
          }
        }
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function(results) {
        results.forEach(function(single) {
          allPosts.push(single);
        });

        _this.props.setPostList({
          ..._this.props.postList,
          posts: allPosts
        });

        _this.props.decrementLoad();
      })
      .catch(function(error) {
        console.log("Could not fetch shows: " + error.message);
        _this.props.decrementLoad();
      });
  }

  render() {
    let posts = this.props.postList.posts;
    let searchResults = this.props.searchResults;
    let searchQuery = this.props.searchQuery;
    let notFound = null;

    if (posts.length === 0 && searchResults.length === 0) {
      return null;
    }

    if (this.props.searchStatus) {
      notFound = <div className="no-shows">Searching cyberspace...</div>;
    }

    if (searchQuery.length > 2) {
      posts = this.props.searchResults;
    }

    let btn = {
      class: "btn--disabled",
      disabled: true,
      text: "Das It"
    };

    if (this.props.postList.getPosts) {
      btn.class = "";
      btn.disabled = false;
      btn.text = "More";
    }

    return (
      <div className="container">
        <TitleBlock title="All Shows">
          <ShowsSearch />
          {notFound !== null ? (
            notFound
          ) : (
            <Fragment>
              <PostList posts={posts} baseUrl={baseUrl} />
              <div className="c-flex-pos c-flex-pos--right">
                <Button
                  classes={btn.class}
                  clicked={this.getShows.bind(this)}
                  disabled={btn.disabled}
                >
                  {btn.text}
                </Button>
              </div>
            </Fragment>
          )}
        </TitleBlock>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(ShowsList);
