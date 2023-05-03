import React from "react";
import "./contact.scss";
import Button from "../Button/Button";

const Contact = () => {
  return (
    <div
      id="home-contact"
      className="flex flex-row gap-8 contact justify-center"
    >
      <div className="contact__left basis-1/3">
        <b>
          <p style={{ fontSize: "24px" }}>
            <b>Get in touch with us</b>
          </p>
          <h1>Let's create the future</h1>
          <p className="mt-12">
            We’re available for commissions and collaborations, and We're
            excited to hear from your visions.We are always happy to support all
            projects even daring ones.
          </p>
        </b>
      </div>
      <div className="contact__right basis-2/3">
        <div className="contact__right-top flex gap-12">
          <div className="basis-1/2">
            <div
              style={{ borderColor: "#636363" }}
              className="flex items-center border-b py-2"
            >
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="First name"
                // value={username}
                // onChange={(e) => {
                //   setUsername(e.target.value);
                // }}
              />
            </div>
            <div
              style={{ borderColor: "#636363" }}
              className="flex items-center border-b py-2 mt-12"
            >
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Email"
                // value={username}
                // onChange={(e) => {
                //   setUsername(e.target.value);
                // }}
              />
            </div>
          </div>
          <div className="basis-1/2">
            <div
              style={{ borderColor: "#636363" }}
              className="flex items-center border-b py-2"
            >
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Last name"
                // value={username}
                // onChange={(e) => {
                //   setUsername(e.target.value);
                // }}
              />
            </div>
            <div
              style={{ borderColor: "#636363" }}
              className="flex items-center border-b py-2 mt-12"
            >
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Phone"
                // value={username}
                // onChange={(e) => {
                //   setUsername(e.target.value);
                // }}
              />
            </div>
          </div>
        </div>
        <div className="contact__right-bottom">
          <div
            style={{ borderColor: "#636363" }}
            className="flex items-center border-b py-2 mt-12"
          >
            <textarea
              style={{ height: "120px" }}
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Messages"
            ></textarea>
            {/* <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Messages"
            /> */}
          </div>
          <div className="flex mt-12 items-center">
            <div className="contact__right basis-4/5">
              <p>
                We all know how important your information is. They are safe
                with us.
              </p>
            </div>
            <div className="contact__right basis-1/5">
              <Button
                background="#FE6060"
                color="#FFFFFF"
                fontSize="16px"
                padding="20px 10px"
              >
                SEND MESSAGE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
