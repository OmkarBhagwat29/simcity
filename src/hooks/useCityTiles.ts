import { useEffect, useState } from "react";
import { Tile, useCity } from "../contexts/city-context";
import { createAssetInstance } from "../assets/assets";
import { buildingFactory } from "../contexts/buildings";

export const useCityTiles = () => {
  const [data, setData] = useState<Tile[] | null>(null);
  const objs: Tile[] = [];
  const { size } = useCity();

  useEffect(() => {
    if (!size) return;

    let index = 0;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const tile = createAssetInstance(
          "grass",
          index,
          i,
          j,
          buildingFactory.grass()
        );

        objs.push({ terrainType: "ground", Object: tile });

        index++;
      }
    }

    setData(objs);
  }, [size]);

  return data;
};
