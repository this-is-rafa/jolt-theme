import React from "react";

const cardCats = props => {
  let catLinks = props.categories.map((cat, i) => {
    let categoryName = cat.name;

    return (
      <span
        className="card-cats__link"
        aria-label={categoryName}
        key={i}
      >
        {categoryName}
      </span>
    );
  });

  return <div className="card-cats">{catLinks}</div>;
};

export default cardCats;