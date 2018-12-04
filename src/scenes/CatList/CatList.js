import React, { Component } from 'react';
import { connect } from 'react-redux';
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

class CatList extends Component {

  state = {
    posts: [],
    catId: null
  };

  componentDidMount() {
    this.getCatBySlug();
  }

  getCatBySlug() {
    this.props.incrementLoad();
    let _this = this;
    let url = window.location.href.split('/');
    let slug = url.pop() || url.pop();
    
    fetch(JoltSettings.URL.api + '/artist-category?slug=' + slug)
      .then( function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then( function(results) {
        _this.setState({catId: results[0].id});
        _this.getShowsByCatId();
      })
      .catch(function(error) {
        console.log('Could not fetch category: ' + error.message);
      });
  }

  getShowsByCatId() {
    let _this = this;
    let catId = _this.state.catId;

    fetch(JoltSettings.URL.api + '/artists/?artist-category=' + catId + '&_embed')
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
      })
      .catch(function(error) {
        console.log('Could not fetch posts by category ID: ' + error.message);
      });
  }

  render() {
    return(
      <div class="container">
        <PostList posts={this.state.posts} baseUrl={baseUrl} />
      </div>
    );
  }

}

export default connect(null, mapDispatchToProps)(CatList);