import React, { useEffect, useState } from "react";
import { useCity } from "../../contexts/city-context";
import { Tile } from "../../contexts/tile";
import { Building } from "../../contexts/buildings";
import BuildingInfo from "./BuildingInfo";

const TileInfo = () => {
  const { selectedObject, city } = useCity();

  const [tile, setTile] = useState<Tile | null>(null);
  const [building, SetBuilding] = useState<Building | null>(null);

  useEffect(() => {
    //set tile
    if (!selectedObject || !city) return;

    const tile = selectedObject.userData.tile;

    if (tile) {
      setTile(tile);
      SetBuilding(null);
      return;
    }

    const building = selectedObject.userData.building;
    if (building) {
      SetBuilding(building);
      setTile(city.tiles[building.x][building.y]);
    }
  }, [selectedObject]);

  return (
    <>
      {" "}
      {tile && (
        <>
          Coordinates: (X: {Math.round(tile.x)} Y: {Math.round(tile.y)})
          <br />
          Terrain: {tile.terrain} <br />
        </>
      )}
      {building && <BuildingInfo building={building} />}
    </>
  );
};

export default TileInfo;
