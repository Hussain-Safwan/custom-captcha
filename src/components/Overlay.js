import React from "react";
import "../styles/overlay.css";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import SquareIcon from "@mui/icons-material/CropSquareOutlined";
import CircleIcon from "@mui/icons-material/CircleOutlined";

const Icon = ({ icon }) => {
  const colorMap = {
    red: "error",
    green: "success",
    blue: "secondary",
  };

  if (icon.iconShape === "triangle")
    return <ChangeHistoryIcon color={colorMap[icon.iconTint]} />;
  else if (icon.iconShape === "square")
    return <SquareIcon color={colorMap[icon.iconTint]} />;
  return <CircleIcon color={colorMap[icon.iconTint]} />;
};

const Overlay = ({ table, location, setIconPosition, handleSectionClick }) => {
  return (
    <div
      style={{ top: location.top, left: location.left }}
      className="mainbody"
    >
      {table.map((item, i) => (
        <div className="section" onClick={() => handleSectionClick(item)}>
          {i + 1}
          {!item.empty && <Icon icon={item} />}
        </div>
      ))}
    </div>
  );
};

export default Overlay;
