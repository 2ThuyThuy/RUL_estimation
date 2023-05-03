import React, { useRef } from "react";
import "./definition.scss";
import definition from "../../assets/img/definition.jpeg";

const Definition = () => {
  const element = useRef();

  return (
    <div className="flex flex-row gap-8 definition justify-center	items-center">
      <div className="definition__left basis-1/2 flex justify-end">
        <img src={definition} />
      </div>
      <div className="definition__right basis-1/2">
        <h1>What is Predictive maintenance</h1>
        <p className="mt-4">
          Predictive modeling is a mathematical process used to predict future
          events or outcomes by analyzing patterns in a given set of input data.
          It is a crucial component of predictive analytics, a type of data
          analytics that uses current and historical data to forecast activity,
          behavior, and trends.
        </p>
      </div>
    </div>
  );
};

export default Definition;
