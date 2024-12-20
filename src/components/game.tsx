import React, { Suspense, useState } from "react";
import CityScene from "./CityScene";

import {
  AssetId,
  CityProvider,
  CommandId,
  ModelEntity,
} from "../contexts/city-context";
import { Mesh, Object3D } from "three";
import { Citizen } from "../contexts/citizen";
import { City } from "../contexts/city";
import ModelManager from "./building/models/ModelManager";

const Game = () => {
  const [city, setCity] = useState<City | null>(null);

  const [assetId, setAsset] = useState<AssetId | undefined>(undefined);
  const [commandId, setCommandId] = useState<CommandId | undefined>(undefined);
  const [citizens, setCitizens] = useState<Citizen[]>([]);

  const [play, setPlay] = useState(true);

  const [buildingObjects, setBuildingObjects] = useState<Object3D[]>([]);

  const [enablePan, setEnablePan] = useState(true);

  const [selectedObject, setSelectedObject] = useState<Object3D | null>(null);

  const [models, setModels] = useState<ModelEntity[]>([]);

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

  const addModels = (models: ModelEntity[]) => {
    setModels(models);
  };

  const addCitizens = (newCitizens: Citizen[]) => {
    setCitizens(newCitizens);
  };

  const LoadingScreen = () => {
    return (
      <div
        style={{
          color: "white",
          zIndex: "10",
          position: "fixed",
          top: "50%",
          left: "50%",
          fontSize: "20px",
          color: "black",
        }}
      >
        Loading...
      </div>
    );
  };

  return (
    <>
      <CityProvider
        value={{
          city,
          setCity,
          buildingObjects,
          addBuildingObjects,
          removeBuildingObjects,
          assetId,
          setAssetId: (toolType) => {
            setAsset(toolType);
          },
          commandId,
          setCommandId,
          play,
          setPlay,
          enablePan,
          setEnablePan,
          citizens,
          addCitizens,
          selectedObject,
          setSelectedObject,
          models: models,
          setModels: addModels,
        }}
      >
        <Suspense fallback={<LoadingScreen />}>
          <ModelManager />
          <CityScene />
        </Suspense>
      </CityProvider>
    </>
  );
};

export default Game;
