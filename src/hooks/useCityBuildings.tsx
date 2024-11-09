import { useEffect, useState } from "react";
import { Object3D } from "three";
import { useCity } from "../contexts/city-context";
import { useThree } from "@react-three/fiber";
import { createAssetInstance } from "../assets/assets";
import { buildingFactory } from "../contexts/buildings";
import { getSelectedObject } from "../helpers/raycaster-helper";

export const useCityBuildings = () => {
  const [building, setBuilding] = useState<Object3D | null>();
  const { raycaster, commandId, assetId, tiles } = useCity();

  const { size, camera, scene } = useThree();

  useEffect(() => {
    if (!assetId) return;

    const onMouseDown = (e: MouseEvent) => {
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
    };

    window.addEventListener("mousedown", onMouseDown);

    return () => {
      console.log("destroying");
      setBuilding(null);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [commandId]);

  if (assetId && commandId === "bulldoze") return building;

  return building;
};
