import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import './header.scss';

const Header = ({ backgroundHeader }) => {
  return (
    <div
      className="header"
      style={{ height: '80px', backgroundColor: backgroundHeader || '#3C6DCD' }}
    >
      <div className="header__left">
        <Link to="/">
          <img alt="boot.AI logo" src={logo} />
        </Link>

        {/* <Link to="/auth/login">Dashboard</Link> */}
      </div>
      <nav className="header__right">
        {/* <Link to="/">Home</Link> */}
        <a href="/#">Home</a>
        <a href="#home-contact">Contact us</a>
        {/* <Link to="/contact-us">Contact us</Link> */}
        <Link to="/auth/login">Sign in</Link>
      </nav>
    </div>
  );
};

export default Header;
