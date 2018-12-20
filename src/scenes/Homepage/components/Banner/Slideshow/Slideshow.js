import React from 'react';

const Slideshow = (props) => {
  return props.images.map( (image, i) => {
    return(
      <img src={image.url} className="banner__img" alt={image.alt} key={i} />
    );
  });
}

export default Slideshow;