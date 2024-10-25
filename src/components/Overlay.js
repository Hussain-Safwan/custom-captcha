import React, { memo, useState } from "react";
import "../styles/overlay.css";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import SquareIcon from "@mui/icons-material/CropSquareOutlined";
import CircleIcon from "@mui/icons-material/CircleOutlined";

// component to render the icon based on a random number provided
// random number originates from Lthe table prepared in 'Layout' components
const Icon = ({ icon }) => {
  const colorMap = {
    red: "error",
    green: "success",
    blue: "secondary",
  };
  const style = { marginTop: "0px" };
  if (icon.iconShape === "triangle")
    return <ChangeHistoryIcon style={style} color={colorMap[icon.iconTint]} />;
  else if (icon.iconShape === "square")
    return <SquareIcon style={style} color={colorMap[icon.iconTint]} />;
  return <CircleIcon style={style} color={colorMap[icon.iconTint]} />;
};

// component to display the moving frame
// initially empty
// divides into sections when capture button is pressed
const Overlay = ({ location, table, handleSectionClick }) => {
  // keeps track of whether a section is selected; initially set to unselected (false)
  const [selectedSections, setSelectedSections] = useState(
    Array(25).fill(false)
  );

  // handle click on the section
  const clickSection = (i) => {
    // update selection focus
    const sections = selectedSections;
    sections[i] = !sections[i];
    setSelectedSections([...sections]);
    // pass the selection information to parent (CaptureImage component)
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
          {/* display icon only if the section is designated to be non-vacant */}
          {!item.empty && <Icon icon={item} />}
        </div>
      ))}
    </div>
  );
};

export default memo(Overlay);
