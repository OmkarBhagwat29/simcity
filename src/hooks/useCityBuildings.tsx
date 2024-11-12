import { useEffect, useState } from "react";
import { Mesh, Object3D } from "three";
import { useCity } from "../contexts/city-context";
import { useThree } from "@react-three/fiber";
import { createAssetInstance } from "../assets/assets";
import { buildingFactory } from "../contexts/buildings";
import { getSelectedObject } from "../helpers/raycaster-helper";
import { Tile } from "../contexts/tile";

let isDragging = false;
export const useCityBuildings = () => {
  const [building, setBuilding] = useState<Object3D | null>();
  const { commandId, setEnablePan, assetId } = useCity();
  const { raycaster } = useThree();

  const { size, camera, scene } = useThree();

  const setBuildingObject = (e: MouseEvent): Mesh | null => {
    const selectedObject = getSelectedObject(
      raycaster,
      scene.children,
      e,
      camera,
      size.width,
      size.height
    );

    const tile = selectedObject?.userData.tile as Tile;

    if (commandId === "bulldoze" && !tile) {
      setBuilding(selectedObject);
    } else if (tile && !tile.building && commandId !== "select" && assetId) {
      const building = buildingFactory[assetId](tile.x, tile.y);
      const asset = createAssetInstance(assetId, tile.x, tile.y, building);

      //create building

      tile.building = building;

      asset.userData.id = building.uuid;

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
        setBuildingObject(e);
      }
    };
    const onMouseUp = () => {
      isDragging = false;

      setEnablePan(true);
    };

    if (commandId !== "select") {
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
