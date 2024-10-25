import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@mui/material";
import CapturedImage from "./CapturedImage";

const VideoFeed = () => {
  const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const randomInt = (rem) => {
    return Math.floor(Math.random() * 10) % rem;
  };
  const [coordinates, setCoordinates] = useState({ top: 0, left: 0 });
  const [image, setImage] = useState();
  const webcamRef = React.useRef(null);
  const [iconMap, setIconMap] = useState({});
  const [challenge, setChallenge] = useState(null);
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
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  const setIconPosition = (position, icon) => {
    const tempMap = iconMap;
    tempMap[position] = icon;
    setIconMap(tempMap);

    if (!icon.empty) {
      setChallenge((state) =>
        !state ? { shape: icon.iconShape, tint: icon.iconTint } : state
      );
    }
  };

  const handleSectionClick = (position) => {
    selectedSections.add(position);
  };

  const validate = () => {
    let count = 0;
    const targetPositions = Object.keys(iconMap).filter(
      (position) =>
        !iconMap[position].empty &&
        iconMap[position].iconShape === challenge.shape &&
        iconMap[position].iconTint === challenge.tint
    );

    // targetPositions.map((item) => console.log(item, iconMap[item]));
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
          challenge={challenge}
          coordinates={coordinates}
          setIconPosition={setIconPosition}
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
