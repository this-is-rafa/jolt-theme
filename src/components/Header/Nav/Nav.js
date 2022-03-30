import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../UI/Icon/Icon";
import MenuButton from "./MenuButton/MenuButton";
import NavSearch from "./NavSearch/NavSearch";

const JoltSettings = window.JoltSettings;
const imageUrl = JoltSettings.URL.template + "/images/";
const baseUrl = JoltSettings.path;
const urls = JoltSettings.URL;

const nav = (props) => (
  <nav className="nav">
    <Link to={baseUrl} className="nav__logo-link nav__logo-link--circle">
      <img
        className="nav__logo-img"
        alt="logo circle"
        src={imageUrl + "jolt-circle-logo.png"}
        srcSet={
          imageUrl +
          "jolt-circle-logo.png, " +
          imageUrl +
          "jolt-circle-logo--2x.png 2x, " +
          imageUrl +
          "jolt-circle-logo--3x.png 3x"
        }
      />
    </Link>

    <Link to={baseUrl} className="nav__logo-link nav__logo-link--text">
      <img
        className="nav__logo-img"
        alt="logo text"
        src={imageUrl + "jolt-text-logo.png"}
        srcSet={
          imageUrl +
          "jolt-text-logo.png, " +
          imageUrl +
          "jolt-text-logo--2x.png 2x, " +
          imageUrl +
          "jolt-text-logo--3x.png 3x"
        }
      />
    </Link>

    <Link to={baseUrl} className="nav__link">
      Home
    </Link>
    <Link to={baseUrl + "info"} className="nav__link">
      Info
    </Link>
    <Link to={baseUrl + "shows"} className="nav__link">
      Shows
    </Link>
    <Link to={baseUrl + "apps"} className="nav__link">
      Apps
    </Link>
    <a
      href={urls.mixcloud}
      className="nav__link"
      target="_blank"
      rel="noopener noreferrer"
    >
      Archive
    </a>
    <Link to={baseUrl + "contact"} className="nav__link">
      Contact
    </Link>
    <NavSearch />
    <a
      href={urls.fb}
      className="nav__link"
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      <Icon name="fb" parentClass="nav" />
    </a>
    <a
      href={urls.ig}
      className="nav__link nav__link--last"
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      <Icon name="ig" parentClass="nav" />
    </a>

    <MenuButton clicked={props.menuClick} open={props.open} />
  </nav>
);

export default nav;
