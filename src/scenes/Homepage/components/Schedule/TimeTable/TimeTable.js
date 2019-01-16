import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TimeTable extends Component {

  renderEvents(events) {
    let count = Object.keys(events).length;
    if (count < 7) {
      //Pad the table to look better
      for (let i = 0; i < (7 - count); i++) {
        events.push({title: ' ', startTime: ' '});
      }
    }
    return events.map( (event, i) => {
      let title = event.title;
      if (event.slug !== undefined) {
        title = <Link to={'artists/' + event.slug} className="schedule__link">{event.title}</Link>
      };

      return(
        <tr className="schedule__row" key={i}>
          <td className="schedule__col schedule__col--time">
            {event.startTime}
          </td>
          <td className="schedule__col">
            {title}
          </td>
        </tr>
      );
    });
  }

  renderDays() {
    return this.props.events.map( (day, i) => {
      return(    
        <div className="col-md-4" key={i}>
          <h6 className="schedules__day">{ day.date }</h6>
          <table className="schedule">
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