import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import temp from "../elephants-ds.jpg";
import { Button } from "@mui/material";
import CapturedImage from "./CapturedImage";

const VideoFeed = ({ table, challenge }) => {
  const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const [coordinates, setCoordinates] = useState({ top: 0, left: 0 });
  const [image, setImage] = useState();
  const webcamRef = React.useRef(null);
  const [errorCount, setErrorCount] = useState(-1);

  let selectedSections = new Set();

  const constraints = { width: 512, height: 512, facingMode: "user" };

  useEffect(() => {
    if (!image) {
      const interval = setInterval(() => {
        setCoordinates((item) => ({
          top: randomNumber(0, 300),
          left: randomNumber(0, 300),
        }));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [image]);

  const capture = React.useCallback(() => {
    // webcamRef.current.getScreenshot();
    const imageSrc = temp;
    setImage(imageSrc);
  }, [webcamRef]);

  const handleSectionClick = (position) => {
    selectedSections.add(position);
  };

  const validate = () => {
    let count = 0;
    const targetPositions = table
      .map((item, i) =>
        !item.empty &&
        item.iconShape === challenge.iconShape &&
        item.iconTint === challenge.iconTint
          ? i
          : -1
      )
      .filter((item) => item !== -1);

    console.log(targetPositions);
    setErrorCount(count);
  };

  return (
    <>
      {!image ? (
        <div>
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
  );
};

export default VideoFeed;
