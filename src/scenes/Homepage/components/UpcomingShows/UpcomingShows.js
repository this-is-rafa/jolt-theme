import React, { Component } from 'react';
import HomeBlock from '../HomeBlock/HomeBlock';
import PostList from '../PostList/PostList';

const JoltSettings = window.JoltSettings;

class UpcomingShows extends Component {

  state = {
    posts: []
  };

  componentDidMount() {
    this.getShows();
  }

  getShows() {
    let _this = this;

    fetch(JoltSettings.URL.api + '/artists/?per_page=6')
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
      })
      .catch(function(error) {
        console.log('Could not fetch shows: ' + error.message);
      });
  }

  render() {
    return(
      <section className="posts">
        <div className="container">
          <HomeBlock title="Upcoming Shows">
            <PostList posts={this.state.posts} baseUrl="artist/" />
          </HomeBlock>
        </div>
      </section>
    );
  };

}

export default UpcomingShows;