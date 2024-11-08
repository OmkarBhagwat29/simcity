import React from "react";
import { useCity } from "../contexts/city-context";


const VisualiseObjects = () => {
  const { tiles, buildingObjects } = useCity();


  return (
    <>
      {tiles &&
        tiles.map((tile, index) => (
          <primitive key={index} object={tile.Object} />
        ))}

      {buildingObjects &&
        buildingObjects.map((obj) => <primitive key={obj.uuid} object={obj} />)}
    </>
  );
};

export default VisualiseObjects;
