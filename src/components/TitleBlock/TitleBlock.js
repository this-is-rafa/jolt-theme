import React from "react";

const titleBlock = props => (
  <div
    className={
      props.class ? "c-bg-wrap c-bg-wrap--" + props.class : "c-bg-wrap"
    }
  >
    <h4 className="section-title">{props.title}</h4>
    {props.children}
  </div>
);

export default titleBlock;
