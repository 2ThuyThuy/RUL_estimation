import React from "react";

import Aside from '../../components/user/Aside/Aside';
import { useNavigate } from 'react-router-dom';
import HeaderUser from '../../components/HeaderUser/HeaderUser'
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import './profileUser.scss'

const ProfileUser = () => {

    const handleSubmit = event => {
        event.preventDefault();
        alert('You have submitted the form.')
      }

    return (
    <div className="calendar-dashboard">
        {/* <HeaderUser backgroundHeader='#3C6DCD' nameUser={"test"} />
        <Aside /> */}
        <div className="wrapper">
        <h1>How About Them Apples</h1>
        <form onSubmit={handleSubmit}>
            <fieldset>
            <label>
                <p>First Name</p>
                <input name="name" />
            </label>
            </fieldset>
            <fieldset>
            <label>
                <p>Last name</p>
                <input name="name" />
            </label>
            </fieldset>

            <fieldset>
            <label>
                <p>Email</p>
                <input name="name" />
            </label>
            </fieldset>

            <fieldset>
            <label>
                <p>Phone number</p>
                <input name="name" />
            </label>
            </fieldset>
            <button type="submit">Submit</button>
        </form>
        </div>
    </div>
    );
  };
  
  export default ProfileUser;
  