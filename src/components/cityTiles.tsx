import React, { useEffect } from "react";

import { useCityTiles } from "../hooks/useCityTiles";
import { useCity } from "../contexts/city-context";

const CityTiles = () => {
  const tiles = useCityTiles();
  const { addBuildingObjects } = useCity();
  useEffect(() => {
    if (tiles) {
      addBuildingObjects(tiles);
    }
  }, [tiles]);

  return <></>;
};

export default CityTiles;
