import { useEffect, useState } from "react";
import { Object3D } from "three";
import { useCity } from "../contexts/city-context";
import { useThree } from "@react-three/fiber";
import { createAssetInstance } from "../assets/assets";
import { buildingFactory } from "../contexts/buildings";
import { getSelectedObject } from "../helpers/raycaster-helper";

let isDragging = false;
export const useCityBuildings = () => {
  const [building, setBuilding] = useState<Object3D | null>();
  const { commandId, setCommandId, assetId, tiles } = useCity();
  const { raycaster } = useThree();

  const { size, camera, scene } = useThree();

  //const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!assetId) return;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        // Left mouse button
        isDragging = true;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        console.log("dragging");
        const selectedObject = getSelectedObject(
          raycaster,
          scene.children,
          e,
          camera,
          size.width,
          size.height
        );

        if (selectedObject) {
          const tile = tiles[selectedObject.userData.tileIndex];

          if (commandId === "bulldoze" && tile.Object.userData.building) {
            tile.Object.userData.building = undefined;
            setBuilding(selectedObject);
          } else if (!tile.Object.userData.building && commandId !== "select") {
            const asset = createAssetInstance(
              assetId!,
              tile.Object.userData.tileIndex,
              tile.Object.position.x,
              tile.Object.position.z,
              buildingFactory[assetId!]()
            );

            tile.Object.userData.building = buildingFactory[assetId!]();

            setBuilding(asset);
          }
        }
      }
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      console.log("destroying");
      setBuilding(null);
      setBuilding(null);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [commandId]);

  if (assetId && commandId === "bulldoze") return building;

  return building;
};
