import React from "react";
import reason from "../../assets/img/reason.png";
import Button from "../Button/Button";
import "./reason.scss";
import reason2 from "../../assets/img/reason-2.jpeg";

const Reason = () => {
  return (
    <div
      className="reason"
      onScroll={() => {
        alert("ok");
      }}
    >
      <div className="reason__top flex flex-row gap-8 justify-center items-center">
        <div className="reason__left basis-1/2">
          <h1>Why do we need predictive maintenance?</h1>
          <p className="mt-4">
            Predictive modeling is a mathematical process used to predict future
            events or outcomes by analyzing patterns in a given set of input
            data. It is a crucial component of predictive analytics, a type of
            data analytics that uses current and historical data to forecast
            activity, behavior, and trends.
          </p>
        </div>
        <div className="reason__right basis-1/2">
          <img src={reason2} />
        </div>
      </div>
      <div className="reason__bottom mt-12">
        <p>
          When a machine fails or it needs to be repaired and maintained, it
          takes a lot of time waiting for scheduling, waiting components, etc.
          That's why we need to optimize the waiting time to increase the
          maximum operating time of the trailers.It helps us reduce time,
          effort, and costs of waiting time in forecasting business outcomes
        </p>
        <img src={reason} />
        <div className="reason__bottom-des">
          <h1>Turning visions into reality</h1>
          <p className="mt-2">
            To minimum the maintenance cost - Use PdM to improve your
            operational way of the vehicles
          </p>
          <div style={{ marginTop: "30px" }}>
            <Button background="#FE6060" color="#FFFFFF">
              GET STARTED
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reason;
