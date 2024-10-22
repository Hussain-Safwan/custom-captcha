import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import Overlay from "./Overlay";
import temp from '../elephants-ds.jpg'
import { Button } from "@mui/material";

const VideoFeed = () => {
  const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const randomInt=(rem)=>{return Math.floor(Math.random() * 10)%rem}
  // let challengeSet=false
  const [coordinates, setCoordinates] = useState({ top: 0, left: 0 });
  const [image, setImage] = useState();
  const webcamRef = React.useRef(null);
  const [iconMap, setIconMap] = useState({});
  const [challenge, setChallenge]=useState(null)

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
    console.log(iconMap)
    const imageSrc = temp
    setImage(imageSrc);
  }, [webcamRef]);

  const setIconPosition = (position, icon) => {
    const tempMap = iconMap;
    tempMap[position] = icon;
    setIconMap(tempMap);

    if (icon!=='empty'){
      setChallenge(state=>!state?{shape:icon.iconShape, tint: icon.iconTint}:state)
    }
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
          {challenge&&<h2>{`Please select all ${challenge.tint} ${challenge.shape}s`}</h2>}
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
            <Button style={{width: '75%'}} variant="outlined">Validate</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoFeed;
