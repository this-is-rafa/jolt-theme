import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TitleBlock from '../../../../components/TitleBlock/TitleBlock';
import PostList from '../../../../components/PostList/PostList';

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

    fetch(JoltSettings.URL.api + '/jolt-upcoming/')
      .then( function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then( function(results) {
        let allPosts = [];
        
        results.some(function(single) {
          if ( !(typeof single.start_time === 'undefined' ) ) {
            if ( _this.timeCheck(single) ) {
              allPosts.push(single);           
            }
          }
          return allPosts.length > 5;
        });

        _this.setState({posts: allPosts});
        _this.props.decrementLoad();
      })
      .catch(function(error) {
        console.log('Could not fetch shows: ' + error.message);
      });
  }

  timeCheck(show) {
    let now = new Date();
    let showTime = new Date(show.start_time * 1000); //php unix timestamp

    if ( showTime > now ) {
      return true;
    }

    return false;
  }

  render() {
    return(
      <section className="posts">
        <div className="container">
          <TitleBlock title="Upcoming Shows">
            <PostList posts={this.state.posts} baseUrl="artist/" />
            <div className="c-flex-pos c-flex-pos--right">
              <Link to="shows" className="btn">
                All Shows
              </Link>
            </div>
          </TitleBlock>
        </div>
      </section>
    );
  };

}

export default connect(null, mapDispatchToProps)(UpcomingShows);