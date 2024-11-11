import React, { useEffect, useRef, useState } from "react";
import "../../css/toolbar.css";
import { CommandId, useCity } from "../../contexts/city-context";

const UIPanel = () => {
  const infoDivRef = useRef<HTMLDivElement | null>(null);

  const { setCommandId, setAssetId, setPlay, setInfoDiv } = useCity();

  const [pauseBtnPressed, setPauseBtnPressed] = useState(false);

  const [activeButton, setActiveButton] = useState<string | null>(null);

  useEffect(() => {
    if (!infoDivRef.current) return;

    setInfoDiv(infoDivRef.current);
  }, [infoDivRef.current]);

  useEffect(() => {
    setPlay(!pauseBtnPressed);
  }, [pauseBtnPressed]);

  const handleButtonClick = (id: CommandId) => {
    setCommandId(id);
    setActiveButton(id!.toString());
  };

  const handlePauseClick = () => {
    setPauseBtnPressed(!pauseBtnPressed);
  };

  return (
    <div className="toolbar">
      <button
        className={`button ${activeButton === "select" ? "active" : ""}`}
        onClick={() => handleButtonClick("select")}
      >
        SELECT
      </button>

      <button
        className={`button ${activeButton === "bulldoze" ? "active" : ""}`}
        onClick={() => handleButtonClick("bulldoze")}
      >
        BULLDOZE
      </button>
      <button
        className={`button ${activeButton === "residential" ? "active" : ""}`}
        onClick={() => {
          handleButtonClick("residential");
          setAssetId("residential");
        }}
      >
        RESIDENTIAL
      </button>
      <button
        className={`button ${activeButton === "commercial" ? "active" : ""}`}
        onClick={() => {
          handleButtonClick("commercial");
          setAssetId("commercial");
        }}
      >
        COMMERCIAL
      </button>
      <button
        className={`button ${activeButton === "industrial" ? "active" : ""}`}
        onClick={() => {
          handleButtonClick("industrial");
          setAssetId("industrial");
        }}
      >
        INDUSTRIAL
      </button>
      <button
        className={`button ${activeButton === "road" ? "active" : ""}`}
        onClick={() => {
          handleButtonClick("road");
          setAssetId("road");
        }}
      >
        ROAD
      </button>

      <div ref={infoDivRef} className="display-panel">
        INFO
      </div>

      <button className="button" onClick={handlePauseClick}>
        {pauseBtnPressed ? "RESUME" : "PAUSE"}
      </button>
    </div>
  );
};

export default UIPanel;
