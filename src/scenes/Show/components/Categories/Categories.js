import React from "react";
import { Link } from "react-router-dom";
import { decodeEntities } from "@wordpress/html-entities";

const categories = props => {
  let catLinks = props.categories.map((cat, i) => {
    let categoryName = decodeEntities(cat.name);

    return (
      <Link
        to={props.baseUrl + cat.slug}
        className="btn post-categories__btn"
        aria-label={categoryName}
        key={i}
      >
        {categoryName}
      </Link>
    );
  });

  return <div className="post-categories">{catLinks}</div>;
};

export default categories;
