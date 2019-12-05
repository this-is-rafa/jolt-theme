import React from 'react';

const Slideshow = (props) => {
  // return props.images.map( (image, i) => {
  //   return(
  //     <img src={image.url} className="banner__img" alt={image.alt} key={i} />
  //   );
  // });
  let imageUrl = props.images.sizes['show-banner'] || '';
  return(
    <img src={imageUrl ? imageUrl : ''} className="banner__img" alt="Jolt Radio Banner" />
  );
}

export default Slideshow;