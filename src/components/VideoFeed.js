import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@mui/material";
import CapturedImage from "./CapturedImage";
import Validated from "./Validated";

const VideoFeed = ({ table, challenge }) => {
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
  const [errorCount, setErrorCount] = useState(-1);
  const [validation, setValidation] = useState({
    done: 0,
    message: "",
  });

  // Set data structure; keeps track of the selected sections
  let selectedSections = new Set();

  // set constraints for the webcam feed window
  const constraints = {
    width: 512,
    height: window.screen.height * 0.5,
    facingMode: "user",
  };

  useEffect(() => {
    const check = async () => {
      const state = await JSON.parse(localStorage.getItem("state"));
      if (state) {
        setImage(state.image);
        setErrorCount(1);
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
      setValidation({
        done: -1,
        message: "You did not successfully complete the CAPTCHA verification",
      });
      localStorage.setItem("state", JSON.stringify({ block: true, image }));
    } else {
      setValidation({
        done: 1,
        message: "CAPTCHA successfully verified!",
      });
    }
  };

  return (
    <>
      {validation.done !== 0 ? (
        <Validated validated={validation} />
      ) : (
        <>
          {!image ? (
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
            <CapturedImage
              table={table}
              challenge={challenge}
              coordinates={coordinates}
              handleSectionClick={handleSectionClick}
              validate={validate}
              image={image}
              errorCount={errorCount}
            />
          )}
        </>
      )}
    </>
  );
};

export default VideoFeed;
