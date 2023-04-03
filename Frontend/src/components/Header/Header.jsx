import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import "./header.scss";

const Header = ({ backgroundHeader }) => {
  return (
    <div
      className="header"
      style={{ height: "80px", backgroundColor: backgroundHeader }}
    >
      <div className="header__left">
        <img src={logo} />
        <Link to="/auth/login">Dashboard</Link>
      </div>
      <nav className="header__right">
        <Link to="/">Home</Link>
        <Link to="/contact-us">Contact us</Link>
        <Link to="/auth/login">Sign in</Link>
      </nav>
    </div>
  );
};

export default Header;
