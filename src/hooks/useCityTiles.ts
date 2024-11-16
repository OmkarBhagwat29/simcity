import { useEffect, useState } from "react";
import { useCity } from "../contexts/city-context";
import { createGrass } from "../assets/assets";

import { Mesh } from "three";
import { createTile } from "../contexts/tile";

export const useCityTiles = () => {
  const [data, setData] = useState<Mesh[] | null>(null);
  const objs: Mesh[] = [];
  const { city } = useCity();

  useEffect(() => {
    if (!city) return;

    for (let i = 0; i < city.size; i++) {
      for (let j = 0; j < city.size; j++) {
        const tile = createTile(i, j, "ground");

        const mesh = createGrass(i, j);

        mesh.userData.tile = tile;

        city.addTile(tile);

        objs.push(mesh);
      }
    }

    setData(objs);
  }, [city]);

  return data;
};
