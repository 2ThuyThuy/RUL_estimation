import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import login from '../../assets/img/login.jpg';
import login1 from '../../assets/img/login1.png';
import './login.scss';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { fetchLogin } from '../../store/authSlice/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  return (
    <div className="login">
      <div className="login__left">
        <img src={login} />
      </div>
      <div className="login__right">
        <div className="login__right-title">
          <img src={login1} />
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            console.log(username, password);
            const result = await dispatch(
              fetchLogin({
                username,
                password,
              })
            )
              .then(unwrapResult)
              .then((originalPromiseResult) => {
                console.log('result', originalPromiseResult);
              })
              .catch((rejectedValueOrSerializedError) => {
                console.log(rejectedValueOrSerializedError);
              });
          }}
          className="w-full max-w-lg"
        >
          <div className="flex items-center border-b border-teal-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="login__right-form-group flex items-center border-b border-teal-500 py-2 mt-10">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Link className="mt-10" to="/">
              Forgot password
            </Link>
          </div>
          <div className="flex flex-row gap-8">
            <div className="basis-1/2">
              <div className="login__right-button mt-20">
                <button>Sign in</button>
              </div>
            </div>
            <div className="basis-1/2">
              <div className="login__right-button mt-20">
                <button>
                  <Link to="/auth/register">Register</Link>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
