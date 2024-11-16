import React, { useEffect } from "react";
import { useCity } from "../contexts/city-context";
import { useCityBuildings } from "../hooks/useCityBuildings";
import { useFrame } from "@react-three/fiber";

import { Mesh, Object3D } from "three";
import { cloneMaterials } from "../helpers/game-helper";

const CityBuildings = () => {
  const {
    city,
    commandId,
    addBuildingObjects,
    removeBuildingObjects,
    play,
    models,
    buildingObjects,
  } = useCity();

  const building = useCityBuildings();

  useEffect(() => {
    if (!building) return;

    if (commandId !== "bulldoze") {
      if (!models) {
        return;
      }
      addBuildingObjects([building]);
    } else {
      removeBuildingObjects([building]);
    }
  }, [building]);

  //update
  useFrame(({ clock }) => {
    if (!play || !city) return;

    const objsToRemove: Object3D[] = [];
    const objsToAdd: Object3D[] = [];

    for (let i = 0; i < city.buildings.length; i++) {
      for (let j = 0; j < city.buildings[0].length; j++) {
        const building = city.buildings[i][j];

        if (building) {
          //find obj and delete
          let oldAsset: Object3D | null = null;
          let newAsset: Object3D | null = null;

          buildingObjects.slice(256).forEach((obj) => {
            if (
              obj.userData.building &&
              obj.userData.building.uuid === building.uuid
            ) {
              oldAsset = obj as Object3D;
              return;
            }
          });

          if (building.updated) {
            if (oldAsset) {
              objsToRemove.push(oldAsset);

              building.updated = false;

              const modelName =
                building.type + "-" + building.style + building.level;

              const foundModel = models!.filter((m) => m.name === modelName)[0];
              console.log(foundModel);
              if (!foundModel) return;

              const newAsset = foundModel.scene.clone();
              cloneMaterials(newAsset);
              newAsset.position.set(building.x, 0, building.y);

              console.log(newAsset);

              newAsset.userData.building = building;

              objsToAdd.push(newAsset);
            }
          }

          if (!building.abandoned) {
            building.update();
          }

          const asset = newAsset ? newAsset : oldAsset;

          if (asset) {
            if (building.makeBuildingAbandonedOrReDeveloped) {
              building.makeBuildingAbandonedOrReDeveloped(
                city,
                clock,
                asset as Mesh
              );
            }

            building.residents?.forEach((citizen) => {
              citizen.update(city);
            });
          }
        }
      }
    }

    if (objsToRemove.length > 0) {
      //console.log(objsToRemove);
      removeBuildingObjects(objsToRemove);
    }

    if (objsToAdd.length > 0) {
      addBuildingObjects(objsToAdd);
    }
  });

  return <></>;
};

export default CityBuildings;
