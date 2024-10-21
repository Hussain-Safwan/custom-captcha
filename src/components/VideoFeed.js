import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import Overlay from "./Overlay";

const VideoFeed = () => {
  const [coordinates, setCoordinates] = useState({ top: 0, left: 0 });
  const [image, setImage] = useState();
  const webcamRef = React.useRef(null);
  const [iconMap, setIconMap] = useState({});

  const constraints = { width: 512, height: 512, facingMode: "user" };
  const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };

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
  };

  const handleSectionClick = (position) => {
    console.log(iconMap[position]);
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
            <button onClick={capture}>Capture</button>
          </div>
        </div>
      ) : (
        <div>
          <div className="webcam-container">
            <Overlay
              location={coordinates}
              setIconPosition={setIconPosition}
              handleSectionClick={handleSectionClick}
            />
            <img src={image} />
          </div>
          <br />
          <div className="capture-btn">
            <button onClick={capture}>Validate</button>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoFeed;
