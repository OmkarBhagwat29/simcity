import { useEffect, useRef, useState } from "react";
import { Object3D } from "three";
import { useCity } from "../contexts/city-context";
import { useThree } from "@react-three/fiber";
import { buildingFactory } from "../contexts/buildings";
import { getSelectedObject } from "../helpers/raycaster-helper";

import { cloneMaterials } from "../helpers/game-helper";

import { createRoad } from "../assets/assets";

function debounce(func: (...args: any[]) => void, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const useCityBuildings = () => {
  const [building, setBuilding] = useState<Object3D | null>();
  const { commandId, setEnablePan, assetId, models, city } = useCity();
  const { raycaster } = useThree();
  const { size, camera, scene } = useThree();
  const isDraggingRef = useRef(false);

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
      if (selectedObject.userData.tile) {
        return selectedObject;
      }

      const building = selectedObject.userData.building;

      if (!building) return selectedObject;

      //if not grass delete the obj

      selectedObject.userData.building = null;
      city.buildings[building.x][building.y] = null;

      setBuilding(selectedObject);
    } else if (commandId !== "select") {
      //get tile

      const tile = selectedObject.userData.tile;

      if (!tile) return selectedObject;

      //on the tile create the aset
      const building = buildingFactory[assetId!](tile.x, tile.y);

      let asset: Object3D | null = null;

      if (assetId !== "road") {
        if (!models) return selectedObject;

        //find model

        asset = models
          .filter((m) => m.name === "under-construction")[0]
          .scene.clone();

        console.log(asset);

        asset.position.set(building.x, 0, building.y);
        cloneMaterials(asset);
      } else {
        asset = createRoad(tile.x, tile.y);
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
        isDraggingRef.current = true;

        const selectedObject = setBuildingObject(e);

        if (selectedObject) {
          setEnablePan(false);
        }
      }
    };

    const onMouseMove = debounce((e: MouseEvent) => {
      if (isDraggingRef.current) {
        e.stopPropagation();
        setBuildingObject(e);
      }
    }, 25);

    const onMouseUp = () => {
      isDraggingRef.current = false;

      setEnablePan(true);
    };

    if (commandId !== "select" && city) {
      window.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      setBuilding(null);

      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [commandId]);

  if (assetId && commandId === "bulldoze") return building;

  return building;
};
