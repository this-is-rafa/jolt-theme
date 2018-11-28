import React from 'react';
import { Link } from 'react-router-dom';

const Card = (props) => (
  <Link to={props.link} className="card" href="#">
    <div class="card__wrap">
      <img src="{props.imgUrl}" alt="jolt" class="card__img" />
      <div class="card__content card__content--top">
        <span class="card__titles card__titles--main">{props.title}</span>
      </div>
      <div class="card__content card__content">
        <span class="card__titles card__titles--subtitle">{props.subtitle}</span>
      </div>
      <div class="card__content card__content--chev">
        <span class="card__titles">></span>
      </div>
    </div>
  </Link>
);

export default Card;