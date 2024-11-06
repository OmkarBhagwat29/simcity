import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { useCity } from "../contexts/city-context";
import { Object3D, Vector2 } from "three";
import CityTiles from "./cityTiles";
import CityBuildings from "./CityBuildings";
import VisualiseObjects from "./VisualiseObjects";

const City = () => {
  const { raycaster, assetId, tiles } = useCity();
  const { size, camera, scene } = useThree();

  const onObjectSelected = (obj: Object3D) => {
    // console.log(assetId);

    const tile = tiles[obj.userData.tileIndex];

    console.log("tile->", tile);

    if (assetId === "bulldoze" && tile.Object.userData.id) {
      console.log("object to delete ->", obj);

      tile.Object.userData.id = undefined;
      scene.remove(obj);

      //console.log(tile.Object);
    } else if (!tile.Object.userData.id) {
      tile.Object.userData.id = assetId;
    }
  };

  useEffect(() => {
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
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [assetId]);

  return (
    <>
      <CityTiles />
      <CityBuildings />
      <VisualiseObjects />
    </>
  );
};

export default City;
