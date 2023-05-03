import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import "./headerUser.scss";



const HeaderUser = ({ backgroundHeader, nameUser}) => {
    return (
      <div
        className="header"
        style={{ height: "80px", backgroundColor: backgroundHeader }}
      >
        <div className="header__left">
          <img src={logo} />
          {/* <Link to="/auth/login">Dashboard</Link> */}
        </div>
        <nav className="header__right">
          <Link to="">{nameUser|| 'admin'}</Link>
        </nav>
      </div>
    );
  };


export default HeaderUser;