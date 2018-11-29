import React, { Component } from 'react';

class TimeTable extends Component {

  renderEvents() {
    return this.props.events.map( (event, i) => {
      let startTime = new Date(event.start.dateTime).toLocaleTimeString('en-US', {formatMatcher: 'basic', hour: 'numeric', minute: 'numeric' });
      return(
          <tr className="schedule__row" key={i}>
            <td className="schedule__col schedule__col--time">
              {startTime}
            </td>
            <td className="schedule__col">
              {event.summary}
            </td>
          </tr>
      );
    });
  }

  render() {
    return(
      <div class="row no-gutters">
        <div class="col-md-4">
          <table class="schedule">
            <thead class="schedule__thead">
              <tr>
                <th class="schedule__header" colspan="2">
                  Wednesday, November 14
                </th>
              </tr>
            </thead>
            <tbody class="schedule__tbody">
              { this.renderEvents() }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TimeTable;