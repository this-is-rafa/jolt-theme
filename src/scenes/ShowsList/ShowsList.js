import React, { Component } from 'react';
import { connect } from 'react-redux';
import TitleBlock from '../../components/TitleBlock/TitleBlock';
import PostList from '../../components/PostList/PostList';

const JoltSettings = window.JoltSettings;
const baseUrl = JoltSettings.path + 'artist/';

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

class ShowsList extends Component {

  state = {
    posts: [],
    page: 1
  };

  componentDidMount() {
    this.getShows();
  }

  getShows() {
    this.props.incrementLoad();
    this.setState({page: this.state.page + 1});
    let _this = this;

    fetch(JoltSettings.URL.api + '/artists/?_embed&per_page=12&orderby=title&order=asc&page=' + _this.state.page)
      .then( function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then( function(results) {
        let allPosts = [];
        
        results.forEach(function(single) {
          allPosts.push(single);
        });

        _this.setState({posts: allPosts});
        _this.props.decrementLoad();
        console.log(_this.state.page);
      })
      .catch(function(error) {
        console.log('Could not fetch shows: ' + error.message);
      });
  }

  render() {
    if (this.state.posts.length === 0) {
      return null;
    }
    return(
      <div className="container">
        <TitleBlock title="All Shows" >
          <PostList posts={this.state.posts} baseUrl={baseUrl} />
        </TitleBlock>
      </div>
    );
  }

}

export default connect(null, mapDispatchToProps)(ShowsList);