import React from "react";
import "../styles/overlay.css";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import SquareIcon from "@mui/icons-material/CropSquareOutlined";
import CircleIcon from "@mui/icons-material/CircleOutlined";
const Icon = ({ setPosition, position }) => {
  const empty = Math.floor(Math.random() * 10) % 2;
  if (empty === 0) {
    setPosition(position, { empty: true });
    return <></>;
  }

  const style = { padding: "10px 0" };
  const iconType = Math.floor(Math.random() * 10) % 3;
  const tintType = Math.floor(Math.random() * 10) % 3;
  const iconTint = ["error", "success", "secondary"];
  const iconList = [
    <ChangeHistoryIcon style={style} color={iconTint[tintType]} />,
    <SquareIcon style={style} color={iconTint[tintType]} />,
    <CircleIcon style={style} color={iconTint[tintType]} />,
  ];

  const colorTranslate = (type) => {
    if (type === 0) return "red";
    else if (type === 1) return "green";
    return "blue";
  };

  if (iconType === 0)
    setPosition(position, {
      empty: false,
      iconShape: "triangle",
      iconTint: colorTranslate(tintType),
    });
  else if (iconType === 1)
    setPosition(position, {
      empty: false,
      iconShape: "square",
      iconTint: colorTranslate(tintType),
    });
  else
    setPosition(position, {
      empty: false,
      iconShape: "circle",
      iconTint: colorTranslate(tintType),
    });
  return iconList[iconType];
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
          {!item.empty && (
            <Icon
              setPosition={setIconPosition}
              position={item}
              style={{ paddingTop: "20px" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Overlay;
