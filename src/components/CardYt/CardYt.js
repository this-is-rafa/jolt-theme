import React from "react";
import Icon from "../UI/Icon/Icon";

const cardYt = props => (
  <a className="card card--yt" href={props.link} rel="noopener noreferrer" target="_blank" title={props.title}>

      <img src={"https://i3.ytimg.com/vi/" + props.ytCode + "/maxresdefault.jpg"} alt={props.title + " thumbnail"} className="card__img card__img--yt" />
      <div className="card__overlay">
        <Icon name="play" parentClass="card__overlay" /> 
      </div>
      <div className="card__content card__content--yt">
        <span
          className="card__titles card__titles--subtitle"
          dangerouslySetInnerHTML={{ __html: props.subtitle }}
        />
      </div>
  </a>
);

export default cardYt;
