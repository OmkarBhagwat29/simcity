import React, { useEffect, useState } from "react";

import { CommandId, useCity } from "../../contexts/city-context";
import "../../css/toolbar.css";

const UIToolbar = () => {
  const { setCommandId, setAssetId, setPlay } = useCity();

  const [pauseBtnPressed, setPauseBtnPressed] = useState(false);

  const [activeButton, setActiveButton] = useState<string | null>(null);

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
        <img src="./icons/select.png" className="toolbar-icon" />
      </button>

      <button
        className={`button ${activeButton === "bulldoze" ? "active" : ""}`}
        onClick={() => handleButtonClick("bulldoze")}
      >
        <img src="./icons/bulldozer.png" className="toolbar-icon" />
      </button>
      <button
        className={`button ${activeButton === "residential" ? "active" : ""}`}
        onClick={() => {
          handleButtonClick("residential");
          setAssetId("residential");
        }}
      >
        <img src="./icons/residential.png" className="toolbar-icon" />
      </button>
      <button
        className={`button ${activeButton === "commercial" ? "active" : ""}`}
        onClick={() => {
          handleButtonClick("commercial");
          setAssetId("commercial");
        }}
      >
        <img src="./icons/commercial.png" className="toolbar-icon" />
      </button>
      <button
        className={`button ${activeButton === "industrial" ? "active" : ""}`}
        onClick={() => {
          handleButtonClick("industrial");
          setAssetId("industrial");
        }}
      >
        <img src="./icons/factory.png" className="toolbar-icon" />
      </button>
      <button
        className={`button ${activeButton === "road" ? "active" : ""}`}
        onClick={() => {
          handleButtonClick("road");
          setAssetId("road");
        }}
      >
        <img src="./icons/road.png" className="toolbar-icon" />
      </button>

      {/* <div ref={infoDivRef} className="display-panel">
        INFO
      </div> */}

      <button className="button" onClick={handlePauseClick}>
        {pauseBtnPressed ? (
          <img src="./icons/play.png" className="toolbar-icon" />
        ) : (
          <img src="./icons/pause.png" className="toolbar-icon" />
        )}
      </button>
    </div>
  );
};

export default UIToolbar;
