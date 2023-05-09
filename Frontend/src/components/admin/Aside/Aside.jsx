import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './aside.scss';

const Aside = () => {
  const Logout = event => {
    sessionStorage.removeItem('token')
  };

  return (
    <div className="admin-aside">
      <nav>
        <NavLink to={'/admin'} end>Dashboard </NavLink>
        <NavLink to={'/admin/calendar'} end >Calendar</NavLink>
        <NavLink to={'/admin/data_raw'} end>Data raw</NavLink>
        <NavLink to={'/admin/data_processed'} end>Data processed</NavLink>
        <NavLink to={'/admin/manager_users'} end>Manager users</NavLink>
        <NavLink to={'/admin/consulting'} end>Consulting</NavLink>
        <NavLink to={'/admin/profile'} end>Profile</NavLink>
        <NavLink to={'/'} Onclick={Logout} end>Logout</NavLink>
      </nav>
    </div>
  );
};

export default Aside;
