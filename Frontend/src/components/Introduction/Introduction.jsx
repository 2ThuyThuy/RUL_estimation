import React, { useRef } from "react";
import background from "../../assets/img/background.jpg";
import "./introduction.scss";
import Button from "../Button/Button";

const Introduction = () => {
  return (
    <div className="introduction">
      <div className="introduction__background">
        <img src={background} />
      </div>
      <div className="introduction__overlay"></div>
      <div className="introduction__center">
        <h1 className="introduction__center-title">Predictive Maintenance</h1>
        <h2>Turning visions into reality</h2>
        <h3 className="mt-4">
          Create your own product platform. Use the best features and tools to
          promote your business in the best way and get new achievements. We
          give you the opportunity the rest depends on you.
        </h3>
        <div className="introduction__center-buttons flex flex-row gap-8 justify-center">
          <Button background="#FE6060" color="#FFFFFF">
            GET STARTED
          </Button>
          <Button background="#EEEEEE" color="#3C6DCD">
            LEARN MORE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
