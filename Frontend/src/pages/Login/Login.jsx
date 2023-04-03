import React from "react";
import { Link } from "react-router-dom";
import login from "../../assets/img/login.jpg";
import login1 from "../../assets/img/login1.png";
import "./login.scss";

const Login = () => {
  return (
    <div className="login">
      <div className="login__left">
        <img src={login} />
      </div>
      <div className="login__right">
        <div className="login__right-title">
          <img src={login1} />
        </div>
        <form className="w-full max-w-sm">
          <div className="flex items-center border-b border-teal-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Users name or Email"
              aria-label="Full name"
            />
          </div>
          <div className="login__right-form-group flex items-center border-b border-teal-500 py-2 mt-10">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Password"
              aria-label="Full name"
            />
            <Link className="mt-10" to="/">
              Forgot password
            </Link>
          </div>
          <div className="login__right-button mt-20">
            <button>Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
