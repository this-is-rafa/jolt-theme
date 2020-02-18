import React from "react";

const Slideshow = props => {
  let imageUrl = props.images.sizes["show-banner"] || "";
  return (
    <img
      src={imageUrl ? imageUrl : ""}
      className="banner__img"
      alt="Jolt Radio Banner"
    />
  );
};

export default Slideshow;
