import CityTiles from "./cityTiles";
import CityBuildings from "./CityBuildings";
import VisualiseObjects from "./VisualiseObjects";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Object3D, Vector2 } from "three";
import { useCity } from "../contexts/city-context";

const City = () => {
  const { size, camera, scene } = useThree();

  const { raycaster, tiles } = useCity();

  useEffect(() => {
    let selectedObject: Object3D | null = null;
    const highlight = (e: MouseEvent) => {
      e.stopPropagation();

      const mouse = new Vector2();
      mouse.x = (e.clientX / size.width) * 2 - 1;
      mouse.y = -(e.clientY / size.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersections = raycaster.intersectObjects(
        tiles.map((tile) => tile.Object),
        false
      );

      if (selectedObject) {
        selectedObject.material.emissive.setHex(0);
      }

      if (intersections.length > 0) {
        selectedObject = intersections[0].object;
        selectedObject.material.emissive.setHex(0x555555);
      }
    };

    window.addEventListener("mousemove", highlight);

    return () => {
      window.removeEventListener("mousemove", highlight);
    };
  }, [tiles]);

  return (
    <>
      <CityTiles />
      <CityBuildings />
      <VisualiseObjects />
    </>
  );
};

export default City;
