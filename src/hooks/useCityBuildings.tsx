import { useEffect, useState } from "react";
import { Object3D } from "three";
import { useCity } from "../contexts/city-context";
import { useFrame } from "@react-three/fiber";
import { createAssetInstance } from "../assets/assets";

export const useCityBuildings = () => {
  const [building, setBuilding] = useState<Object3D>();
  const { tiles } = useCity();

  const tempBuildings: (Object3D | null)[] = [];
  useEffect(() => {
    if (!tiles) return;

    tiles.forEach(() => tempBuildings.push(null));
  }, [tiles]);

  useFrame(({ scene }) => {
    if (!tiles) return;

    tiles.forEach((tile, index) => {
      const pos = tile.Object.position;

      const currentBuildingId = tempBuildings[index]?.userData.id;

      const newBuildingId = tile.Object.userData.id;

      //if player removes a building, remove it from scene
      if (currentBuildingId && !newBuildingId) {
        scene.remove(tempBuildings[index]!);
        tempBuildings[index] = null;
      }
      //id is changed
      if (newBuildingId !== currentBuildingId) {
        scene.remove(tempBuildings[index]!);
        tempBuildings[index] = createAssetInstance(
          newBuildingId,
          index,
          pos.x,
          pos.z
        );
        scene.add(tempBuildings[index]);
      }
    });
  });

  return building;
};
