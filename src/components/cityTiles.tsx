import React, { useEffect } from "react";
import { useCity } from "../contexts/city-context";
import { useCityTiles as useCityTiles } from "../hooks/useCityTiles";


const CityTiles = () => {
  const { addTileObjects } = useCity();
  const tiles = useCityTiles();

  useEffect(() => {
    if (tiles) {
      addTileObjects(tiles);
    }
  }, [tiles]);

  return <></>;
};

export default CityTiles;
