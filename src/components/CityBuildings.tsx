import React, { useEffect, useMemo } from "react";
import { AssetId, useCity } from "../contexts/city-context";
import { useCityBuildings } from "../hooks/useCityBuildings";
import { useFrame } from "@react-three/fiber";
import { createAssetInstance } from "../assets/assets";
import { Mesh, Object3D } from "three";
import { Building } from "../contexts/buildings";

const CityBuildings = () => {
  const {
    city,
    commandId,
    addBuildingObjects,
    removeBuildingObjects,
    play,
    models,
  } = useCity();

  const building = useCityBuildings();

  useEffect(() => {
    if (!building) return;

    const buildingData = building.userData.building as Building;

    if (buildingData === null || !city) return;

    if (commandId !== "bulldoze") {
      if (!models) {
        return;
      }
      addBuildingObjects([building]);
    } else {
      removeBuildingObjects([building]);

      if (buildingData.dispose) {
        buildingData.dispose();
      }
    }
  }, [building]);

  //update
  useFrame(({ clock, scene }) => {
    if (!play || !city) return;

    const objsToRemove: Object3D[] = [];
    const objsToAdd: Object3D[] = [];

    scene.traverse((child) => {
      if (child.userData.buildingId) {

        

        const building = child.userData.tile.building as Building;

        if (building.updated) {
          //delete this object
          objsToRemove.push(child);

          //crete new asset
          const newAsset = createAssetInstance(
            building.type,
            building.x,
            building.y,
            building
          );
          building.updated = false;
          newAsset.userData.buildingId = building.uuid;

          //add object
          objsToAdd.push(newAsset);
        }

        building.update();
      }
    });

    if (objsToRemove.length > 0) {
      //console.log(objsToRemove);
      removeBuildingObjects(objsToRemove);
    }

    if (objsToAdd.length > 0) {
      addBuildingObjects(objsToAdd);
    }

    // for (let i = 0; i < city.size; i++) {
    //   for (let j = 0; j < city.size; j++) {
    //     const buildingData = city.buildings[i][j];
    //     if (!buildingData) continue;

    //     if (buildingData.updated) {
    //       //remove from scene
    //       const obj = objectMap.get(buildingData.uuid);

    //       if (!obj) {
    //         continue;
    //       }

    //       // objsToRemove.push(obj);
    //       objectMap.delete(buildingData.uuid);

    //       removeBuildingObjects([obj]);

    //       const assetId = buildingData.type as AssetId;
    //       const newAsset = createAssetInstance(
    //         assetId,
    //         buildingData.x,
    //         buildingData.y,
    //         buildingData
    //       );

    //       newAsset.userData = {};
    //       buildingData.updated = false;
    //       newAsset.userData.building = buildingData;
    //       //objsToAdd.push(newAsset);

    //       addBuildingObjects([newAsset]);
    //       objectMap.set(buildingData.uuid, newAsset);
    //     }
    //     //
    //     if (buildingData.makeBuildingAbandonedOrReDeveloped) {
    //       const abondonedBuilding = objectMap.get(buildingData.uuid);

    //       if (abondonedBuilding instanceof Mesh) {
    //         //console.log("reached");
    //         buildingData.makeBuildingAbandonedOrReDeveloped(
    //           city,
    //           clock,
    //           abondonedBuilding
    //         );
    //       }
    //     }

    //     if (!buildingData.abandoned) {
    //       buildingData.update();
    //     }

    //     buildingData.residents?.forEach((citizen) => {
    //       citizen.update(city);
    //     });
    //   }
    // }
  });

  return <></>;
};

export default CityBuildings;
