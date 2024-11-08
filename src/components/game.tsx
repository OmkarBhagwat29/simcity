import React, { useState } from "react";
import CityScene from "./CityScene";

import {
  AssetId,
  CityProvider,
  CommandId,
  Tile,
} from "../contexts/city-context";
import { Object3D, Raycaster } from "three";

const Game = () => {
  const [tiles, setTileObjects] = useState<Tile[]>([]);
  const [assetId, setAsset] = useState<AssetId | undefined>(undefined);
  const [commandId, setCommandId] = useState<CommandId | undefined>(undefined);

  const [buildingObjects, setBuildingObjects] = useState<Object3D[]>([]);

  const addTileObjects = (tiles: Tile[]) => {
    setTileObjects((prv: Tile[]) => [...prv, ...tiles]);
  };

  const addBuildingObjects = (objs: Object3D[]) => {
    setBuildingObjects((prv) => [...prv, ...objs]);
  };

  const removeBuildingObjects = (objs: Object3D[]) => {
    setBuildingObjects((prevBuildingObjects) => {
      // Prepare a new array with the filtered buildings outside of React's state update
      const newBuildingObjects = prevBuildingObjects.filter(
        (building) => !objs.some((obj) => obj.uuid === building.uuid)
      );
      return newBuildingObjects;
    });
  };

  return (
    <>
      <CityProvider
        value={{
          size: 16,
          tiles,
          addTileObjects,
          buildingObjects,
          addBuildingObjects,
          removeBuildingObjects,
          raycaster: new Raycaster(),
          assetId,
          setAssetId: (toolType) => {
            setAsset(() => toolType);
          },
          commandId,
          setCommandId,
        }}
      >
        <CityScene />
      </CityProvider>
    </>
  );
};

export default Game;
