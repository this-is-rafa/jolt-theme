import React, { Component } from 'react';
import HomeBlock from '../HomeBlock/HomeBlock';

const JoltSettings = window.JoltSettings;

class UpcomingShows extends Component {

  state = {
    posts: []
  };

  getShows() {
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

        this.setState({posts: allPosts});
      })
      .catch(function(error) {
        console.log('Could not fetch shows: ' + error.message);
      });
  }
}

export default UpcomingShows;