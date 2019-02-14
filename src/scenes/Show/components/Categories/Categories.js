import React from 'react';
import { Link } from 'react-router-dom';

const categories = (props) => {
  let catLinks = props.categories.map( (cat, i) => (
    <Link to={props.baseUrl + cat.slug} className="btn post-categories__btn" aria-label={cat.name} key={i}>{cat.name}</Link>
  ));

  return(
  <div className="post-categories">
    {catLinks}
  </div>
)};

export default categories;