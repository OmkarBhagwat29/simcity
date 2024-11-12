import React, { useEffect, useState } from "react";
import { useCity } from "../../contexts/city-context";
import { Tile } from "../../contexts/tile";
import BuildingInfo from "./BuildingInfo";

const TileInfo = () => {
  const { selectedObject, city } = useCity();

  const [tile, setTile] = useState<Tile | null>(null);

  useEffect(() => {
    //set tile
    if (!selectedObject || !city) return;

    let tile = selectedObject.userData.tile;
    if (!tile) {
      tile = city.tiles[selectedObject.position.x][selectedObject.position.z];
    }

    if (tile) {
      setTile(tile);
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
      {tile && tile.building && <BuildingInfo building={tile.building} />}
    </>
  );
};

export default TileInfo;
