import React from "react";
import "../../css/toolbar.css";
import { useCity } from "../../contexts/city-context";

const UIPanel = () => {
  const { setToolType } = useCity();
  const onBulldoze = (e) => {
    setToolType("BULLDOZE");
  };

  const onResidential = (e) => {
    setToolType("RESIDENTIAL");
  };

  const onCommercial = (e) => {
    setToolType("COMMERCIAL");
  };

  const onIndustrial = (e) => {
    setToolType("INDUSTRIAL");
  };

  const onRoad = (e) => {
    setToolType("ROAD");
  };

  return (
    <div className="toolbar">
      <button onClick={onBulldoze}>BULLDOZE</button>
      <button onClick={onResidential}>RESIDENTIAL</button>
      <button onClick={onCommercial}>COMMERCIAL</button>
      <button onClick={onIndustrial}>INDUSTRIAL</button>
      <button onClick={onRoad}>ROAD</button>
    </div>
  );
};

export default UIPanel;
