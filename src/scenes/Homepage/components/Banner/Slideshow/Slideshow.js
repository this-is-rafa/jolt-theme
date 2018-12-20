import React from 'react';

const Slideshow = (props) => {
  return props.images.map( (image, i) => {
    return(
      <img src={image.url} className="banner__img" alt={image.alt} key={i} />
    );
  });
  // console.log(props.images);
  // let image = props.images[0];
  // return(
  //   <img src={props.images[0].url} className="banner__img" alt={props.images[0].alt} />
  // );
}

export default Slideshow;