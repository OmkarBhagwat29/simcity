import { useEffect, useState } from "react";
import { Object3D } from "three";
import { useCity } from "../contexts/city-context";
import { useThree } from "@react-three/fiber";
import { buildingFactory } from "../contexts/buildings";
import { getSelectedObject } from "../helpers/raycaster-helper";

import { cloneMaterials } from "../helpers/game-helper";
import { createAssetInstance } from "../assets/assets";

let isDragging = false;
export const useCityBuildings = () => {
  const [building, setBuilding] = useState<Object3D | null>();
  const { commandId, setEnablePan, assetId, models, city } = useCity();
  const { raycaster } = useThree();
  const { size, camera, scene } = useThree();

  const setBuildingObject = (e: MouseEvent): Object3D | null => {
    if (!city) return null;

    e.stopPropagation();
    const selectedObject = getSelectedObject(
      raycaster,
      scene.children,
      e,
      camera,
      size.width,
      size.height
    );

    if (!selectedObject) return selectedObject;

    if (commandId === "bulldoze") {
      //check if click occur on asset
      if (assetId === "grass") {
        return selectedObject;
      }

      //if not grass delete the obj
      setBuilding(selectedObject);

      const building = selectedObject.userData.building;

      if (!building) return selectedObject;

      selectedObject.userData.building = null;
      city.buildings[building.x][building.y] = null;
    } else if (commandId !== "select") {
      //get tile

      const tile = selectedObject.userData.tile;

      if (!tile) return selectedObject;

      //on the tile create the aset
      const building = buildingFactory[assetId!](tile.x, tile.y);

      let asset: Object3D | null = null;

      if (assetId !== "road") {
        if (!models) return selectedObject;

        asset = models[0].clone();
        asset.position.set(building.x, 0, building.y);
        cloneMaterials(asset);
      } else {
        asset = createAssetInstance(assetId!, tile.x, tile.y, building);
      }

      asset.userData.building = building;
      city.addBuilding(building);

      setBuilding(asset);
    }

    return selectedObject;
  };

  useEffect(() => {
    if (!assetId) return;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        // Left mouse button
        isDragging = true;

        const selectedObject = setBuildingObject(e);

        if (selectedObject) {
          setEnablePan(false);
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.stopPropagation();
        setBuildingObject(e);
      }
    };
    const onMouseUp = () => {
      isDragging = false;

      setEnablePan(true);
    };

    if (commandId !== "select" && city) {
      window.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      console.log("destroying");
      setBuilding(null);

      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [commandId]);

  if (assetId && commandId === "bulldoze") return building;

  return building;
};
