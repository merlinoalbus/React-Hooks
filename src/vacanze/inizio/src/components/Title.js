import React from "react";

const Title = ({ titolo }) => {
  return (
    <div
      style={{
        width: "fit-content",
        fontVariant: "small-caps",
        position: "relative",
        display: "block",
        placeItems: "center",
      }}
    >
      <h3>{titolo}</h3>
      <div className="underline"></div>
    </div>
  );
};

export default Title;
