import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './aside.scss';


const Aside = () => {
  return (
    <div className="admin-aside">
      <nav>
        <NavLink to={'/user/userdashboard'} end>Dashboard </NavLink>
        <NavLink to={'/user/calendar'} end >Calendar</NavLink>
        <NavLink to={'/user/data_processed'} end>Data processed</NavLink>
        <NavLink to={'/user/profile'} end>Profile</NavLink>
      </nav>
    </div>
  );
};

export default Aside;
