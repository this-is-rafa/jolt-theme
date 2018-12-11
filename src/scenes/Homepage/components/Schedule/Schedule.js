import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../../components/UI/Button/Button';
import TitleBlock from '../../../../components/TitleBlock/TitleBlock';
import TimeTable from './TimeTable/TimeTable';

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

class Schedule extends Component {

  state = {
    events: []
  };

  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
    this.props.incrementLoad();
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
        _this.props.decrementLoad();
      })
      .catch(function(error) {
        console.log('Could not fetch events: ' + error.message);
      });
  }

  render() {
    return(
      <section className="schedule">
        <div className="container">
          <TitleBlock title="Upcoming Shows">
            <TimeTable events={this.state.events} />
            <div class="c-flex-pos c-flex-pos--right">
              <Button>
                More
              </Button>
            </div>
          </TitleBlock>
        </div>
      </section>
    );
  };

}

export default connect(null, mapDispatchToProps)(Schedule);