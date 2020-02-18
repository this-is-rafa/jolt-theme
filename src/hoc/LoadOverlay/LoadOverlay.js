import React from "react";
import { connect } from "react-redux";
import Icon from "../../components/UI/Icon/Icon";

const loadOverlay = props => (
  <div
    className={
      props.loading === 0 ? "load-overlay" : "load-overlay load-overlay--active"
    }
  >
    <Icon name="bolt" parentClass="load-overlay" />
  </div>
);

function mapStateToProps(state) {
  return {
    loading: state.loading
  };
}

export default connect(mapStateToProps)(loadOverlay);
