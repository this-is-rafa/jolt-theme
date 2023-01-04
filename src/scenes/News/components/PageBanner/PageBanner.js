import React from "react";

const pageBanner = (props) => (
  <div className="post-banner">
    <img src={props.image} className="post-banner__img" alt={props.title} />
    <div className="post-banner__content post-banner__content--top">
      <span
        className="post-banner__titles post-banner__titles--main"
        dangerouslySetInnerHTML={{ __html: props.title }}
      />
    </div>
    <div className="post-banner__content">
      <span
        className="post-banner__titles post-banner__titles--subtitle"
        dangerouslySetInnerHTML={{ __html: props.subtitle }}
      />
    </div>
  </div>
);

export default pageBanner;
