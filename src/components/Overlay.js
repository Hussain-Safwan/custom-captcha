import React from "react";
import "../styles/overlay.css";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import SquareIcon from "@mui/icons-material/CropSquareOutlined";
import CircleIcon from "@mui/icons-material/CircleOutlined";
const Icon = () => {
  const empty = Math.floor(Math.random() * 10) % 2;
  if (empty === 0) return <></>;

  const iconType = Math.floor(Math.random() * 10) % 3;
  console.log(iconType);
  const iconList = [<ChangeHistoryIcon />, <SquareIcon />, <CircleIcon />];
  return iconList[iconType];
};

const Overlay = ({ location, setIconMap }) => {
  const handleClick = (e) => {
    console.log(e);
  };
  return (
    <div
      style={{ top: location.top, left: location.left }}
      className="mainbody"
    >
      {[...Array(25).keys()].map((item) => (
        <div className="section" onClick={() => handleClick(item)}>
          <Icon />
        </div>
      ))}
    </div>
  );
};

export default Overlay;
