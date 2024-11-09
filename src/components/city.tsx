import CityTiles from "./cityTiles";
import CityBuildings from "./CityBuildings";
import VisualiseObjects from "./VisualiseObjects";
import { useEffect } from "react";
import { useCity } from "../contexts/city-context";
import { getSelectedObject } from "../helpers/raycaster-helper";
import { useThree } from "@react-three/fiber";
import { Mesh } from "three";

const City = () => {
  const { commandId, raycaster, infoDiv, tiles } = useCity();
  const { size, camera, scene } = useThree();
  useEffect(() => {
    let selectedObject: Mesh | null = null;
    const onMouseDown = (e: MouseEvent) => {
      if (selectedObject && selectedObject.material.length) {
        //show info

        selectedObject.material.forEach((mat) => {
          mat.emissive.setHex(0);
        });

        if (infoDiv) {
          infoDiv.innerHTML = "";
        }
      }

      selectedObject = getSelectedObject(
        raycaster,
        scene.children,
        e,
        camera,
        size.width,
        size.height
      );

      if (selectedObject && selectedObject.material.length) {
        //show info

        selectedObject.material.forEach((mat) => {
          mat.emissive.setHex(0x555555);
        });

        //get tile
        const tile = tiles.filter(
          (tile, index) => index === selectedObject?.userData.tileIndex
        )[0];

        if (tile && infoDiv) {
          infoDiv.innerHTML = JSON.stringify(tile.Object.userData, null, 2)
            .replace(/^{|}$/g, "") // Removes the curly braces
            .replace(/,/g, "<br>") // Replaces commas with <br>
            .replace(/"/g, ""); // Removes the quotes around keys and values
        }
      }
    };

    if (commandId !== "select") return;

    window.addEventListener("mousedown", onMouseDown);

    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [commandId]);

  return (
    <>
      <CityTiles />
      <CityBuildings />
      <VisualiseObjects />
    </>
  );
};

export default City;
