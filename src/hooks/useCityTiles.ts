import { useEffect, useRef, useState } from "react";
import { Tile, useCity } from "../contexts/city-context";
import { useFrame } from "@react-three/fiber";
import { createAssetInstance } from "../assets/assets";

export const useCityTiles = () => {
  const [data, setData] = useState<Tile[] | null>(null);
  const objs: Tile[] = [];
  const { size, buildingStage } = useCity();

  useEffect(() => {
    if (!size) return;

    let index = 0;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const tile = createAssetInstance("grass", index, i, j);
        tile.userData.id = undefined;
        objs.push({ terrainType: "grass", Object: tile });

        index++;
      }
    }

    setData(objs);
  }, [size]);

  // useFrame(() => {
  //   if (!data) return;

  //   data.forEach((tile) => {
  //     if (Math.random() < 0.001) {
  //       if (tile.Object.userData.id == "grass") {
  //         tile.Object.userData.id = buildingStage[0].name;
  //       } else if (tile.Object.userData.id === buildingStage[0].name) {
  //         tile.Object.userData.id = buildingStage[1].name;
  //       } else {
  //         tile.Object.userData.id = buildingStage[2].name;
  //       }
  //     }
  //   });
  // });

  return data;
};
