import React, { memo, useState } from "react";
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
  const style = { marginTop: "13px" };
  if (icon.iconShape === "triangle")
    return <ChangeHistoryIcon style={style} color={colorMap[icon.iconTint]} />;
  else if (icon.iconShape === "square")
    return <SquareIcon style={style} color={colorMap[icon.iconTint]} />;
  return <CircleIcon style={style} color={colorMap[icon.iconTint]} />;
};

const Overlay = ({ location, table, handleSectionClick }) => {
  const [selectedSections, setSelectedSections] = useState(
    Array(25).fill(false)
  );
  const clickSection = (i) => {
    const sections = selectedSections;
    sections[i] = !sections[i];
    setSelectedSections([...sections]);
    handleSectionClick(i);
  };

  return (
    <div
      style={{ top: location.top, left: location.left }}
      className="mainbody"
    >
      {table.map((item, i) => (
        <div
          className={selectedSections[i] ? "section selected" : "section"}
          onClick={() => clickSection(i)}
        >
          {/* {i + 1} */}
          {!item.empty && <Icon icon={item} />}
        </div>
      ))}
    </div>
  );
};

export default memo(Overlay);
