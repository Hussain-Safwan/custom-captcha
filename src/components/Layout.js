import React from "react";
import VideoFeed from "./VideoFeed";
import "../styles/layout.css";

const Layout = () => {
  const randomInt = (rem) => {
    return Math.floor(Math.random() * 10) % rem;
  };
  const iconShapes = ["triangle", "square", "circle"];
  const iconTints = ["red", "green", "blue"];
  let challenge = null;

  let table = Array(25).fill(0);
  table.forEach((item, i) => {
    const empty = randomInt(2);
    if (empty) {
      table[i] = { empty: true };
    } else {
      const type = randomInt(3);
      table[i] = {
        empty: false,
        iconShape: iconShapes[type],
        iconTint: iconTints[type],
      };
      if (!challenge) challenge = table[i];
    }
  });

  return (
    <div className="wrapper">
      <div className="feed">
        <VideoFeed table={table} challenge={challenge} />
      </div>
    </div>
  );
};

export default Layout;
