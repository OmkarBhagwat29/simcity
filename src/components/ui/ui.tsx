import React from "react";
import UIToolbar from "./UiToolbar";

import UiTitelbar from "./UiTitlebar";
import InfoDisplay from "../html/InfoDisplay";
import TileInfo from "../html/TileInfo";

const UI = () => {
  return (
    <>
      <UIToolbar />
      <UiTitelbar />
      <InfoDisplay>
        <TileInfo />
      </InfoDisplay>
    </>
  );
};

export default UI;
