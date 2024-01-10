import React from "react";
import { Link } from "react-router-dom";

const JoltSettings = window.JoltSettings;
const baseUrl = JoltSettings.path;
const urls = JoltSettings.URL;

const NavMobile = (props) => (
  <nav className={props.open ? "nav-over nav-over--open" : "nav-over"}>
    <div className="nav-over__col">
      <Link to={baseUrl} onClick={props.close} className="nav-over__link">
        Home
      </Link>
      <Link
        to={baseUrl + "info"}
        onClick={props.close}
        className="nav-over__link"
      >
        Info
      </Link>
      <Link
        to={baseUrl + "news"}
        onClick={props.close}
        className="nav-over__link"
      >
        News
      </Link>
      <Link
        to={baseUrl + "shows"}
        onClick={props.close}
        className="nav-over__link"
      >
        Shows
      </Link>
      <Link
        to={baseUrl + "support"}
        onClick={props.close}
        className="nav-over__link"
      >
        Support
      </Link>
    </div>
    <div className="nav-over__col">
      <Link
        to={baseUrl + "apps"}
        onClick={props.close}
        className="nav-over__link"
      >
        Get the App
      </Link>
      <a
        href={urls.mixcloud}
        className="nav-over__link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Archive
      </a>
      <Link
        to={baseUrl + "contact"}
        onClick={props.close}
        className="nav-over__link"
      >
        Contact
      </Link>
      <a
        href={urls.ig}
        className="nav-over__link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Instagram
      </a>
      <a
        href={urls.fb}
        className="nav-over__link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Facebook
      </a>
    </div>
  </nav>
);

export default NavMobile;
