import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { useCity } from "../contexts/city-context";
import { Object3D, Vector2 } from "three";
import CityTiles from "./cityTiles";
import CityBuildings from "./CityBuildings";
import VisualiseObjects from "./VisualiseObjects";

const City = () => {
  const { raycaster, onObjectSelected } = useCity();
  const { size, camera, scene } = useThree();

  useEffect(() => {
    let selectedObject: Object3D | null = null;
    const onMouseDown = (e: MouseEvent) => {
      //e.stopPropagation();

      const mouse = new Vector2();
      mouse.x = (e.clientX / size.width) * 2 - 1;
      mouse.y = -(e.clientY / size.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersections = raycaster.intersectObjects(scene.children, false);
      //console.log(intersections);
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
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  return (
    <>
      <CityTiles />
      <CityBuildings />
      <VisualiseObjects />
    </>
  );
};

export default City;
