import React, { useEffect } from "react";
import { AssetId, useCity } from "../contexts/city-context";
import { useCityBuildings } from "../hooks/useCityBuildings";
import { useFrame } from "@react-three/fiber";
import { createAssetInstance } from "../assets/assets";
import { BuildingType } from "../contexts/buildings";
import { Object3D } from "three";

const CityBuildings = () => {
  const {
    commandId,
    addBuildingObjects,
    removeBuildingObjects,
    tiles,
    buildingObjects,
    play,
  } = useCity();

  const building = useCityBuildings();

  useEffect(() => {
    if (!building) return;

    if (commandId !== "bulldoze") {
      setTimeout(() => {
        addBuildingObjects([building]);
      }, 0);
    } else {
      setTimeout(() => {
        removeBuildingObjects([building]);
      }, 0);
    }
  }, [building]);

  //update
  useFrame(() => {
    if (!play) return;

    const objsToRemove: Object3D[] = [];
    const objsToAdd: Object3D[] = [];

    tiles.forEach((tile, index) => {
      if (tile.Object.userData.building) {
        const exisitingBuilding = buildingObjects.filter(
          (building) => building.userData.tileIndex === index
        )[0];

        if (tile.Object.userData.building && exisitingBuilding) {
          const building = tile.Object.userData.building as BuildingType;

          if (building.updated) {
            objsToRemove.push(exisitingBuilding);

            const assetId = building.type as AssetId;
            const newAsset = createAssetInstance(
              assetId,
              index,
              tile.Object.position.x,
              tile.Object.position.z,
              building
            );

            building.updated = false;

            objsToAdd.push(newAsset);
          }

          building.update();
        }
      }
    });

    if (objsToRemove.length > 0) {
      // console.log("remove length ->", objsToRemove.length);
      removeBuildingObjects(objsToRemove);
    }

    if (objsToAdd.length > 0) {
      addBuildingObjects(objsToAdd);
      // console.log("add length ->", objsToAdd.length);
    }
  });

  return <></>;
};

export default CityBuildings;
