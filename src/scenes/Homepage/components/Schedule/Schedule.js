import React, { Component } from "react";
import { connect } from "react-redux";
import TitleBlock from "../../../../components/TitleBlock/TitleBlock";
import TimeTable from "./TimeTable/TimeTable";

const mapStateToProps = state => {
  return {
    events: state.events
  };
};

class Schedule extends Component {
  render() {
    if (this.props.events.length > 0) {
      return (
        <section className="schedules">
          <div className="container">
            <TitleBlock title="Live Schedule">
              <TimeTable events={this.props.events} />
            </TitleBlock>
          </div>
        </section>
      );
    } else {
      return null;
    }
  }
}

export default connect(mapStateToProps, null)(Schedule);
