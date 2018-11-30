import React, { Component } from 'react';
import HomeBlock from '../HomeBlock/HomeBlock';
import TimeTable from './TimeTable/TimeTable';

const JoltSettings = window.JoltSettings;

class Schedule extends Component {

  state = {
    events: []
  };

  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
    let _this = this;

    fetch(JoltSettings.URL.api + '/jolt-cal')
      .then( function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then( function(results) {
        let allEvents = [];
        console.log(results);
        results.forEach(function(single) {
          allEvents.push(single);
        });

        _this.setState({events: results});
      })
      .catch(function(error) {
        console.log('Could not fetch events: ' + error.message);
      });
  }

  render() {
    return(
      <section className="schedule">
        <div className="container">
          <HomeBlock title="Upcoming Shows">
            <TimeTable events={this.state.events} />
          </HomeBlock>
        </div>
      </section>
    );
  };

}

export default Schedule;