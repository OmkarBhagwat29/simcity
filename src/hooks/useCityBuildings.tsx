import { useEffect, useState } from "react";
import { Object3D, Vector2 } from "three";
import { useCity } from "../contexts/city-context";
import { useFrame, useThree } from "@react-three/fiber";
import { createAssetInstance } from "../assets/assets";
import { buildingFactory } from "../contexts/buildings";

export const useCityBuildings = () => {
  const [building, setBuilding] = useState<Object3D | null>();
  const { raycaster, commandId, assetId, tiles } = useCity();

  const { size, camera, scene } = useThree();

  const onObjectSelected = (obj: Object3D) => {
    // console.log(assetId);

    const tile = tiles[obj.userData.tileIndex];

    if (commandId === "bulldoze" && tile.Object.userData.building) {
      tile.Object.userData.building = undefined;
      setBuilding(obj);
    } else if (!tile.Object.userData.building) {
      const asset = createAssetInstance(
        assetId!,
        tile.Object.userData.tileIndex,
        tile.Object.position.x,
        tile.Object.position.z,
        buildingFactory[assetId!]()
      );

      tile.Object.userData.building = buildingFactory[assetId!]();

      console.log(tile.Object.userData);
      setBuilding(asset);
    }
  };

  useEffect(() => {
    if (!assetId) return;

    let selectedObject: Object3D | null = null;

    const onMouseDown = (e: MouseEvent) => {
      e.stopPropagation();

      const mouse = new Vector2();
      mouse.x = (e.clientX / size.width) * 2 - 1;
      mouse.y = -(e.clientY / size.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersections = raycaster.intersectObjects(scene.children, false);

      if (selectedObject) {
        selectedObject.material.emissive.setHex(0);
      }

      if (intersections.length > 0) {
        selectedObject = intersections[0].object;
        selectedObject.material.emissive.setHex(0x555555);

        onObjectSelected(selectedObject);
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
