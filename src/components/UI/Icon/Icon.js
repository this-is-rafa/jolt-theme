import React from "react";

const Icon = props => (
  <svg
    className={`${props.parentClass}__icon ${props.parentClass}__icon--${props.name}`}
  >
    <use xlinkHref={`#icon-${props.name}`} />
  </svg>
);

export default Icon;
