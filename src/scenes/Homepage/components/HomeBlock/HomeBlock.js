import React from 'react';

const homeBlock = (props) => (
  <div className="c-bg-wrap">
    <h4 className="section-title">{props.title}</h4>
    {props.children}
  </div>
)

export default homeBlock;