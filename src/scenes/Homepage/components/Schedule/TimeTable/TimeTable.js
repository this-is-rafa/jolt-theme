import React, { Component } from 'react';

class TimeTable extends Component {

  renderEvents(day) {
    return day.map( (event, i) => {
      return(
          <tr className="schedule__row" key={i}>
            <td className="schedule__col schedule__col--time">
              {event.startTime}
            </td>
            <td className="schedule__col">
              {event.title}
            </td>
          </tr>
      );
    });
  }

  renderDays() {
    return this.props.events.map( (day, i) => {
      return(
        <div className="col-md-4" key={i}>
          <table className="schedule">
            <thead className="schedule__thead">
              <tr>
                <th className="schedule__header" colSpan="2">
                  { day.date }
                </th>
              </tr>
            </thead>
            <tbody className="schedule__tbody">
              { this.renderEvents(day.events) }
            </tbody>
          </table>
        </div>
      );
    });
  }

  render() {
    return(
      <div className="row no-gutters">
        { this.renderDays() }
      </div>
    );
  }
}

export default TimeTable;