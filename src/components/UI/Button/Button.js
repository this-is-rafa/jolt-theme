import React from 'react';

const button = (props) => (
  <button 
    className={props.classes ? 'btn ' + props.classes : 'btn'}
    onClick={props.clicked}
    aria-label={props.children}
  >
      {props.children}
  </button> 
)

export default button;