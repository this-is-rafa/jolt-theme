import React from 'react';

const homeBlock = (props) => (
  <div class="c-bg-wrap">
    <h4 class="section-title">{props.title}</h4>
    {props.children}
  </div>
)

export default homeBlock;