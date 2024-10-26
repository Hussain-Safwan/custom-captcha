import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@mui/material";
import CapturedImage from "./CapturedImage";
import Validated from "./Validated";
import { useNavigate } from "react-router-dom";
import { Apps } from "@mui/icons-material";

const VideoFeed = ({ table, challenge }) => {
  const navigate = useNavigate();

  // function to spit random value in the given range
  const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  // state to keep track of the curent location of frame
  const [coordinates, setCoordinates] = useState({ top: 0, left: 0 });
  // screenshot image
  const [image, setImage] = useState();
  // reference to the webcam element
  const webcamRef = React.useRef(null);
  // track the current validation state
  // done -> 0: represents unvalidated, 1: validation success, -1: error in validation
  const [validation, setValidation] = useState(
    JSON.parse(localStorage.getItem("state"))
  );

  // Set data structure; keeps track of the selected sections
  let selectedSections = new Set();

  // set constraints for the webcam feed window
  const constraints = {
    width: 512,
    height: window.screen.height * 0.5,
    facingMode: "user",
  };

  // check validation state upon reload
  // if validation=-1, i.e. error incurred, re-validation wil not be allowed
  // this is done to prevent multiple attempts in validation
  useEffect(() => {
    const check = async () => {
      const state = await JSON.parse(localStorage.getItem("state"));
      if (state) {
        setValidation(state);
      }
    };

    check();
  }, []);

  // method to randomly move the frame around untill capture button is clicked
  // achieved by randomly setting top and left values in CSS in an interval of 1 second
  useEffect(() => {
    if (!image) {
      const interval = setInterval(() => {
        setCoordinates((item) => ({
          top: randomNumber(0, 256),
          left: randomNumber(0, 256),
        }));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [image]);

  // screenshot capture function
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  const appState = JSON.parse(localStorage.getItem("state"));
  if (appState.retryLeft < 1) {
    navigate("/validated", {
      state: appState,
    });
    return;
  }

  // handle click on sections of the frame
  const handleSectionClick = (position) => {
    // if already selected, then delete from set to simulate unselect operation
    if (selectedSections.has(position)) {
      selectedSections.delete(position);
    }
    // reverse if not selected
    else {
      selectedSections.add(position);
    }
  };

  // validate if the user was able to meet the presented challenge
  const validate = () => {
    const state = JSON.parse(localStorage.getItem("state"));

    // isolate given targets
    const targetPositions = table
      .map((item, i) =>
        !item.empty &&
        item.iconShape === challenge.iconShape &&
        item.iconTint === challenge.iconTint
          ? i
          : -1
      )
      .filter((item) => item !== -1);

    // check if all target positions have been clicked
    if (
      targetPositions.sort().join(",") !==
      Array.from(selectedSections).sort().join(",")
    ) {
      // save the error state in persistent storage to discourage further re-validation
      localStorage.setItem(
        "state",
        JSON.stringify({
          done: -1,
          retryLeft: state.retryLeft - 1,
          message: "You did not successfully complete the CAPTCHA verification",
        })
      );
      // mark the validation to be errenous
      navigate("/validated", {
        state: {
          done: -1,
          retryLeft: state.retryLeft - 1,
          message: "You did not successfully complete the CAPTCHA verification",
        },
      });
    } else {
      // set validation success
      navigate("/validated", {
        state: {
          done: 1,
          retryLeft: state.retryLeft,
          message: "CAPTCHA successfully verified!",
        },
      });
    }
  };

  return (
    <>
      {/* check if already validated */}
      {!validation.retryLeft ? (
        // navigate to validated page if already validated
        <Validated validated={validation} />
      ) : (
        <>
          {/* else head on to usual routine and check if screenshot has already been captured */}
          {!image ? (
            // if screenshot not captured, render the webcam component
            <div>
              <h2>Take Selfie</h2>
              <div className="webcam-container">
                <div
                  className="overlay"
                  style={{ top: coordinates.top, left: coordinates.left }}
                ></div>
                <Webcam
                  screenshotFormat="image/jpeg"
                  ref={webcamRef}
                  mirrored
                  videoConstraints={constraints}
                />
              </div>
              <br />
              <div className="capture-btn">
                <Button
                  style={{ width: "75%" }}
                  variant="outlined"
                  onClick={capture}
                >
                  Capture
                </Button>
              </div>
            </div>
          ) : (
            // render captured image component if captured
            <CapturedImage
              table={table}
              challenge={challenge}
              coordinates={coordinates}
              handleSectionClick={handleSectionClick}
              validate={validate}
              image={image}
            />
          )}
        </>
      )}
    </>
  );
};

export default VideoFeed;
