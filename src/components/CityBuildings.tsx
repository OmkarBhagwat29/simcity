import React, { useEffect, useMemo } from "react";
import { AssetId, useCity } from "../contexts/city-context";
import { useCityBuildings } from "../hooks/useCityBuildings";
import { useFrame } from "@react-three/fiber";
import { createAssetInstance } from "../assets/assets";
import { Object3D } from "three";

const CityBuildings = () => {
  const { city, commandId, addBuildingObjects, removeBuildingObjects, play } =
    useCity();

  const building = useCityBuildings();

  const objectMap = useMemo(() => {
    return new Map<string, Object3D>();
  }, []);

  useEffect(() => {
    if (!building) return;

    if (commandId !== "bulldoze") {
      addBuildingObjects([building]);
      objectMap.set(building.userData.id, building);
    } else {
      removeBuildingObjects([building]);
      objectMap.delete(building.userData.id);

      const tile = city?.tiles[building.position.x][building.position.z];

      if (tile) {
        if (tile.building && tile.building.dispose) {
          tile.building.dispose();
        }

        tile.building = null;
      }
    }
  }, [building]);

  //update
  useFrame(() => {
    if (!play || !city) return;

    const objsToRemove: Object3D[] = [];
    const objsToAdd: Object3D[] = [];

    for (let i = 0; i < city.size; i++) {
      for (let j = 0; j < city.size; j++) {
        const tile = city.tiles[i][j];

        if (tile.building) {
          const building = tile.building;

          if (building.updated) {
            //remove from scene
            const obj = objectMap.get(building.uuid);

            if (!obj) {
              continue;
            }

            objsToRemove.push(obj);

            const assetId = building.type as AssetId;
            const newAsset = createAssetInstance(
              assetId,
              tile.x,
              tile.y,
              building
            );

            building.updated = false;
            newAsset.userData.id = building.uuid;
            objsToAdd.push(newAsset);
          }

          tile.building.update();

          tile.building.residents?.forEach((citizen) => {
            citizen.update(city);
          });
        }
      }
    }

    if (objsToRemove.length > 0) {
      // console.log("remove length ->", objsToRemove.length);
      removeBuildingObjects(objsToRemove);

      objsToRemove.forEach((o) => objectMap.delete(o.userData.id));
    }

    if (objsToAdd.length > 0) {
      addBuildingObjects(objsToAdd);

      objsToAdd.forEach((o) => objectMap.set(o.userData.id, o));
      // console.log("add length ->", objsToAdd.length);
    }
  });

  return <></>;
};

export default CityBuildings;
