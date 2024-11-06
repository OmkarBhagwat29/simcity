import React, { useEffect, useState } from "react";
import CityScene from "./CityScene";

import { BuildingStage, CityProvider, Tile } from "../contexts/city-context";
import { Object3D, Raycaster } from "three";

const Game = () => {
  const [tiles, setTileObjects] = useState<Tile[]>([]);
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

  const onObjectSelected = (obj: Object3D) => {
    console.log(obj.userData);
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
          onObjectSelected,
          raycaster: new Raycaster(),
        }}
      >
        <CityScene />
      </CityProvider>
    </>
  );
};

export default Game;
