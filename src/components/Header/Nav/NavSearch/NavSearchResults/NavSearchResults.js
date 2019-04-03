import React from "react";
import { decodeEntities } from "@wordpress/html-entities";

const JoltSettings = window.JoltSettings;
const baseUrl = JoltSettings.path + "artist/";

const navSearchResults = props => {
  return (
    <ul className="nav-search-results">
      {props.results.map((result, i) => (
        <li
          className="nav-search-results__link"
          key={i}
          onClick={() => props.clicked(baseUrl + result.slug)}
        >
          {decodeEntities(result.title.rendered)}
        </li>
      ))}
    </ul>
  );
};

export default navSearchResults;
