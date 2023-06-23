import React from "react";
import "./Title.css";

const Title = ({ text, valueO }) => {
  if (valueO === 1) {
    return (
      <div className="title-container1">
        <label>{text}</label>
      </div>
    );
  } else {
    return (
      <div className="title-container2">
        <label>{text}</label>
      </div>
    );
  }
};

export default Title;
