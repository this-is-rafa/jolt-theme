import React, { Component } from 'react';
import { connect } from 'react-redux';
import TitleBlock from '../../../../components/TitleBlock/TitleBlock';
import PostList from '../PostList/PostList';

const JoltSettings = window.JoltSettings;

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

class UpcomingShows extends Component {

  state = {
    posts: []
  };

  componentDidMount() {
    this.getShows();
  }

  getShows() {
    this.props.incrementLoad();
    let _this = this;

    fetch(JoltSettings.URL.api + '/artists/?per_page=6&_embed')
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
        console.log('Could not fetch shows: ' + error.message);
      });
  }

  render() {
    return(
      <section className="posts">
        <div className="container">
          <TitleBlock title="Upcoming Shows">
            <PostList posts={this.state.posts} baseUrl="artist/" />
          </TitleBlock>
        </div>
      </section>
    );
  };

}

export default connect(null, mapDispatchToProps)(UpcomingShows);