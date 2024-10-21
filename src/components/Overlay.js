import React from "react";
import "../styles/overlay.css";
const Overlay = ({ location }) => {
  return (
    <div
      style={{ top: location.top, left: location.left }}
      className="mainbody"
    >
      {[...Array(25).keys()].map((item) => (
        <div className="section">{item}</div>
      ))}
    </div>
  );
};

export default Overlay;
