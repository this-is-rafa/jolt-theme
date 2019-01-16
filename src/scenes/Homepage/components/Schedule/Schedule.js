import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../../actions/actions';
import TitleBlock from '../../../../components/TitleBlock/TitleBlock';
import TimeTable from './TimeTable/TimeTable';

// const mapDispatchToProps = (dispatch) => {
//   return {
//     incrementLoad: () => {
//       const action = {type: 'LOAD'};
//       dispatch(action);
//     },
//     decrementLoad: () => {
//       const action = {type: 'UNLOAD'};
//       dispatch(action);
//     }
//   }
// }

function mapStateToProps(state) {
  return {
    events: state.events
  }
}

class Schedule extends Component {

  render() {
    console.log(this.props);
    if ( this.props.events.length > 0 ) {
      return(
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
  };

}

export default connect(mapStateToProps, actionCreators)(Schedule);