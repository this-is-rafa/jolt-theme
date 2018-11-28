import React from 'react';

const HomeBlock = (props) => (
  <div class="c-bg-wrap">
    <h4 class="section-title">{props.title}</h4>
    {props.children}
  </div>
)

export default HomeBlock;