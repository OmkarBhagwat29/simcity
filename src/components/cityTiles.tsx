import React, { useEffect } from "react";
import { useCity } from "../contexts/city-context";
import { useCityTiles as useCityTiles } from "../hooks/useCityTiles";
import { Mesh } from "three";
import { useThree } from "@react-three/fiber";
import { getSelectedObject } from "../helpers/raycaster-helper";

const CityTiles = () => {
  const { addTileObjects, raycaster, commandId } = useCity();
  const { size, camera } = useThree();
  const tiles = useCityTiles();

  useEffect(() => {
    if (tiles) {
      addTileObjects(tiles);
    }

    let selectedObject: Mesh | null = null;
    const onMouseMove = (e: MouseEvent) => {
      if (!tiles) return;

      if (selectedObject) {
        selectedObject.material.emissive.setHex(0);
      }

      selectedObject = getSelectedObject(
        raycaster,
        tiles.map((tile) => tile.Object),
        e,
        camera,
        size.width,
        size.height
      );
      if (selectedObject) {
        selectedObject.material.emissive.setHex(0x55555);
      }
    };

    if (commandId === "select") {
      window.removeEventListener("mousemove", onMouseMove);
    }

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [tiles, commandId]);

  return <></>;
};

export default CityTiles;
