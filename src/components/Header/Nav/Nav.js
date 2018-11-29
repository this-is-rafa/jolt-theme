import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../UI/Icon/Icon';

const nav = () => (
  <nav className="nav">
    <Link to='/' className="nav__logo-link nav__logo-link--circle">
      <img className="nav__logo-img" alt="logo circle" 
        src="images/jolt-circle-logo.png"
        srcset="images/jolt-circle-logo.png,
                images/jolt-circle-logo--2x.png 2x,
                images/jolt-circle-logo--3x.png 3x"
      />
    </Link>

    <Link to='/' className="nav__logo-link nav__logo-link--text">
      <img className="nav__logo-img" alt="logo text" 
      src="images/jolt-circle-logo.png"
      srcset="images/jolt-text-logo.png,
              images/jolt-text-logo--2x.png 2x,
              images/jolt-text-logo--3x.png 3x"
      />
    </Link>

    <Link to='/' className="nav__link">Home</Link>
    <Link to='/' className="nav__link">Shows</Link>
    <Link to='/' className="nav__link">Archive</Link>
    <Link to='/' className="nav__link">Contact</Link>
    <a href="http://facebook.com/joltradio" className="nav__link" target="_blank" rel="noopener noreferrer nofollow">
      <Icon name="fb" parentClass="nav" />
    </a>
    <a href="http://instagram.com/joltradio " className="nav__link nav__link--last" target="_blank" rel="noopener noreferrer nofollow">
      <Icon name="ig" parentClass="nav" />
    </a>

    <div className="hamburger" id="js-hamburger">
      <div id="js-hamburger-line-top" className="hamburger__open-line hamburger__open-line--top"></div>
      <div id="js-hamburger-line-bottom" className="hamburger__open-line hamburger__open-line--bottom"></div>
    </div>
  </nav>
);

export default nav;