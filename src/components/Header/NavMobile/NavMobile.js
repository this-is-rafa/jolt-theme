import React from 'react';
import { Link } from 'react-router-dom';

const NavMobile = (props) => (
  <nav className={props.open ? 'nav-over nav-over--open' : 'nav-over'} >
    <Link to="/" className="nav-over__link">Home</Link>
    <Link to="/" className="nav-over__link">Shows</Link>
    <Link to="/" className="nav-over__link">Archive</Link>
    <Link to="/" className="nav-over__link">Shop</Link>
    <Link to="/" className="nav-over__link">Android App</Link>
    <Link to="/" className="nav-over__link">iOS App</Link>
  </nav>
);

export default NavMobile;