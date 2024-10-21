import React from "react";
import "../styles/overlay.css";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import SquareIcon from "@mui/icons-material/CropSquareOutlined";
import CircleIcon from "@mui/icons-material/CircleOutlined";
const Icon = ({ setPosition, position }) => {
  const empty = Math.floor(Math.random() * 10) % 2;
  if (empty === 0) {
    setPosition(position, "empty");
    return <></>;
  }

  const iconType = Math.floor(Math.random() * 10) % 3;
  const iconList = [<ChangeHistoryIcon />, <SquareIcon />, <CircleIcon />];
  if (iconType === 0) setPosition(position, "triangle");
  else if (iconType === 1) setPosition(position, "square");
  else setPosition(position, "circle");
  return iconList[iconType];
};

const Overlay = ({ location, setIconPosition, handleSectionClick }) => {
  return (
    <div
      style={{ top: location.top, left: location.left }}
      className="mainbody"
    >
      {[...Array(25).keys()].map((item) => (
        <div className="section" onClick={() => handleSectionClick(item)}>
          <Icon
            setPosition={setIconPosition}
            position={item}
            style={{ paddingTop: "20px" }}
          />
        </div>
      ))}
    </div>
  );
};

export default Overlay;
