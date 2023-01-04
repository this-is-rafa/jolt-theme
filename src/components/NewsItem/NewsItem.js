import React from "react";
import { Link } from "react-router-dom";

const newsItem = (props) => (
  <Link to={props.link} className="card" href="#">
    <div className="card__wrap">
      <img src={props.imgUrl} alt="jolt" className="card__img" />
      <div className="card__content card__content--top">
        <span
          className="card__titles card__titles--main"
          dangerouslySetInnerHTML={{ __html: props.title }}
        />
      </div>
      <div className="card__content card__content">
        <span
          className="card__titles card__titles--subtitle"
          dangerouslySetInnerHTML={{ __html: props.subtitle }}
        />
      </div>
      <div className="card__content card__content--chev">
        <span className="card__titles">></span>
      </div>
    </div>
  </Link>
);

export default newsItem;
