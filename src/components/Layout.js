import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoFeed from "./VideoFeed";
import Validated from "./Validated";
import "../styles/layout.css";

const Layout = () => {
  // random function spitting values between 0 and 'rem'
  const randomInt = (rem) => {
    return Math.floor(Math.random() * 10) % rem;
  };

  // set the application state if not set already.
  // 3 rounds of retries are allowed for each user
  // after each unsuccessful round, a try-again button with retry-left value appears
  // upon completion of the 3rd consecutive unsuccessful round, the retry button gets disabled
  // even address bar routing is disabled in this case, with the help of persistent storage
  const state = JSON.parse(localStorage.getItem("state"));
  if (!state) {
    localStorage.setItem(
      "state",
      JSON.stringify({
        done: 0,
        retryLeft: 3,
        message: "",
      })
    );
  }

  // list of the names of the icons
  const iconShapes = ["triangle", "square", "circle"];
  // list of the names of the tints
  const iconTints = ["red", "green", "blue"];
  // object to track the current challenge
  let challenge = null;

  // initiallize the value of the table to be presented inside the frame
  let table = Array(25).fill(0);
  table.forEach((item, i) => {
    // randomly select half of the sections to be vacant
    const empty = Math.random() >= 0.5;
    if (empty) {
      // for section designated to be vacant, set the empty flag
      table[i] = { empty: true };
    } else {
      // for non-vacant sections, randomly fill with shape and tint and unset the empty flag
      const type = randomInt(3);
      table[i] = {
        empty: false,
        iconShape: iconShapes[type],
        iconTint: iconTints[type],
      };
      // if challenge has not been presented yet than assign the table to the challenge object
      if (!challenge) challenge = table[i];
    }
  });

  return (
    <div className="wrapper">
      <div className="feed">
        <BrowserRouter>
          <Routes>
            {/* default route set to video-feed */}
            <Route
              path="/"
              element={<VideoFeed table={table} challenge={challenge} />}
            ></Route>
            {/* routes to validated page upon completion of a challenge */}
            <Route path="validated" element={<Validated />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default Layout;
