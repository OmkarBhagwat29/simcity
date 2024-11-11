import React from "react";
import { useCity } from "../../contexts/city-context";
import "../../css/titlebar.css";

const UiTitelbar = () => {
  const { citizens } = useCity();

  return (
    <div className="titlebar">
      <div className="titlebar-left-items">$1000</div>
      <div className="titlebar-center-items">My City</div>
      <div className="titlebar-right-items">Population: {citizens.length}</div>
    </div>
  );
};

export default UiTitelbar;
