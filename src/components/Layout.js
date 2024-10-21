import React from "react";
import VideoFeed from "./VideoFeed";
import "../styles/layout.css";

const Layout = () => {
  return (
    <div className="wrapper">
      <div className="feed">
        <VideoFeed />
      </div>
    </div>
  );
};

export default Layout;
