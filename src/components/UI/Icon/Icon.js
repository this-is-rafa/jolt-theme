import React from 'react';
//import './icons.svg';

const Icon = (props) => (
  <svg className={`${props.parentClass}__icon`}>
    <use xlinkHref={`#icon-${props.name}`} />
  </svg>
);

export default Icon;