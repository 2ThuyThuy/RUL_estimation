import React from "react";
import { Link } from "react-router-dom";
import login from "../../assets/img/login.jpg";
import login1 from "../../assets/img/login1.png";
import "./register.scss";

const Register = () => {
  return (
    <div className="register">
      <div className="register__left">
        <img src={login} />
      </div>
      <div className="register__right">
        <div className="register__right-title">
          <img src={login1} />
        </div>
        <form className="w-full max-w-lg">
          <div class="flex flex-row gap-8">
            <div class="basis-1/2">
              <div className="flex items-center border-b border-teal-500 py-2">
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="First Name"
                  aria-label="Full name"
                />
              </div>
            </div>
            <div class="basis-1/2">
              <div className="flex items-center border-b border-teal-500 py-2">
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Last Name"
                  aria-label="Full name"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center border-b border-teal-500 py-2 mt-10">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Email"
              aria-label="Full name"
            />
          </div>
          <div className="flex items-center border-b border-teal-500 py-2 mt-10">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Username"
              aria-label="Full name"
            />
          </div>
          <div className="flex items-center border-b border-teal-500 py-2 mt-10">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Password"
              aria-label="Full name"
            />
          </div>
          <div className="register__right-form-group flex items-center border-b border-teal-500 py-2 mt-10">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Confirm Password"
              aria-label="Full name"
            />
          </div>
          <div class="flex flex-row gap-8">
            <div class="basis-1/2">
              <div className="register__right-button mt-20">
                <button>Register</button>
              </div>
            </div>
            <div class="basis-1/2">
              <div className="register__right-button mt-20">
                <button>
                  <Link to="/auth/login">Sign in</Link>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
