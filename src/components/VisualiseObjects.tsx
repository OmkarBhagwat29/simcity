import React from "react";
import { useCity } from "../contexts/city-context";
import { useFrame } from "@react-three/fiber";

const VisualiseObjects = () => {
  const { tiles, buildingObjects } = useCity();

  // useFrame(({ camera }) => {
  //   console.log("Camera Position:", camera.position);
  //   console.log("Camera Rotation:", camera.rotation);
  // });

  return (
    <>
      {tiles &&
        tiles.map((tile, index) => (
          <primitive key={index} object={tile.Object} />
        ))}

      {buildingObjects &&
        buildingObjects.map((obj, index) => (
          <primitive key={index} object={obj} />
        ))}
    </>
  );
};

export default VisualiseObjects;
