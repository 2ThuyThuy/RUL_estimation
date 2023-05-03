import React from "react";
import "./button.scss";

const Button = ({
  children,
  background,
  color,
  padding = " 20px 70px",
  fontSize = " 20px",
}) => {
  return (
    <div
      className="button"
      style={{
        backgroundColor: background,
        color: color,
        padding: padding,
        fontSize: fontSize,
      }}
    >
      {children}
    </div>
  );
};

export default Button;
