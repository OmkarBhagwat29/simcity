import React, { useState } from "react";
import "../../css/toolbar.css";
import { CommandId, useCity } from "../../contexts/city-context";

const selectedColor = "lightblue";
const UIPanel = () => {
  const { setCommandId, setAssetId } = useCity();

  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleButtonClick = (id: CommandId) => {
    setCommandId(id);
    setActiveButton(id.toString());
  };

  return (
    <div className="toolbar">
      <button
        onClick={() => handleButtonClick("bulldoze")}
        style={{
          backgroundColor:
            activeButton === "bulldoze" ? selectedColor : "white",
        }}
      >
        BULLDOZE
      </button>
      <button
        onClick={() => {
          handleButtonClick("residential");
          setAssetId("residential");
        }}
        style={{
          backgroundColor:
            activeButton === "residential" ? selectedColor : "white",
        }}
      >
        RESIDENTIAL
      </button>
      <button
        onClick={() => {
          handleButtonClick("commercial");
          setAssetId("commercial");
        }}
        style={{
          backgroundColor:
            activeButton === "commercial" ? selectedColor : "white",
        }}
      >
        COMMERCIAL
      </button>
      <button
        onClick={() => {
          handleButtonClick("industrial");
          setAssetId("industrial");
        }}
        style={{
          backgroundColor:
            activeButton === "industrial" ? selectedColor : "white",
        }}
      >
        INDUSTRIAL
      </button>
      <button
        onClick={() => {
          handleButtonClick("road");
          setAssetId("road");
        }}
        style={{
          backgroundColor: activeButton === "road" ? selectedColor : "white",
        }}
      >
        ROAD
      </button>
    </div>
  );
};

export default UIPanel;
