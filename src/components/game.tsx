import React, { useEffect, useState } from "react";
import CityScene from "./CityScene";

import {
  BuildingStage,
  CityProvider,
  Tile,
  ToolType,
} from "../contexts/city-context";
import { Object3D, Raycaster } from "three";

const Game = () => {
  const [tiles, setTileObjects] = useState<Tile[]>([]);
  const [toolType, setToolType] = useState<ToolType>(null);
  const [buildingObjects, setBuildingObjects] = useState<Object3D[]>([]);

  const buildingStage: BuildingStage[] = [
    { name: "stage-1", height: 1 },
    { name: "stage-2", height: 2 },
    { name: "stage-3", height: 3 },
  ];

  const addTileObjects = (tiles: Tile[]) => {
    setTileObjects((prv: Tile[]) => [...prv, ...tiles]);
  };

  const addBuildingObjects = (objs: Object3D[]) => {
    setBuildingObjects((prv) => [...prv, ...objs]);
  };

  return (
    <>
      <CityProvider
        value={{
          size: 16,
          tiles,
          addTileObjects,
          buildingObjects,
          buildingStage,
          addBuildingObjects,
          raycaster: new Raycaster(),
          toolType,
          setToolType: (toolType) => {
            setToolType(toolType);
          },
        }}
      >
        <CityScene />
      </CityProvider>
    </>
  );
};

export default Game;
