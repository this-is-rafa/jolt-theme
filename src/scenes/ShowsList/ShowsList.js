import React, { Component } from 'react';
import { connect } from 'react-redux';
import TitleBlock from '../../components/TitleBlock/TitleBlock';
import PostList from '../../components/PostList/PostList';
import Button from '../../components/UI/Button/Button';

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
    page: 1,
    getPosts: true
  };

  componentDidMount() {
    this.getShows();
  }

  getShows() {
    if (!this.state.getPosts) return;
    this.props.incrementLoad();
    this.setState({page: this.state.page + 1});
    let allPosts = this.state.posts;
    let totalPages;
    let _this = this;

    fetch(JoltSettings.URL.api + '/artists/?_embed&per_page=12&orderby=title&order=asc&page=' + _this.state.page)
      .then( function(response) {
        for (var entry of response.headers.entries()) {
          if (entry[0] === "x-wp-totalpages") {
              totalPages = entry[1];
          }

          if (_this.state.page > totalPages) {
              _this.setState({ getPosts: false });
          }
        }
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then( function(results) {
        
        results.forEach(function(single) {
          allPosts.push(single);
        });

        _this.setState({posts: allPosts});

        _this.props.decrementLoad();
      })
      .catch(function(error) {
        console.log('Could not fetch shows: ' + error.message);
        _this.props.decrementLoad();
      });
  }

  render() {
    if (this.state.posts.length === 0) {
      return null;
    }
    let btn = {
      class: '',
      disabled: false,
      text: 'More'
    }

    if (!this.state.getPosts) {
      btn.class = 'btn--disabled';
      btn.disabled = true;
      btn.text = 'Das It';
    }

    return(
      <div className="container">
        <TitleBlock title="All Shows" >
          <PostList posts={this.state.posts} baseUrl={baseUrl} />
          <div className="c-flex-pos c-flex-pos--right">
            <Button 
              classes={btn.class}
              clicked={this.getShows.bind(this)}
              disabled={btn.disabled}>
                {btn.text}
            </Button>
          </div>
        </TitleBlock>
      </div>
    );
  }

}

export default connect(null, mapDispatchToProps)(ShowsList);