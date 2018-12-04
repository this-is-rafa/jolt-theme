import React from 'react';

const featuredImage = (props) => (
  <div className="post-featured-image">
    <img src={props.image} alt={props.title} className="post-featured-image__img" />
  </div>
);

export default featuredImage;