import React from "react";
import { useCity } from "../contexts/city-context";

const SetupLights = () => {
  const { size } = useCity();
  return (
    <>
      <ambientLight color={0xffffff} intensity={3} />

      <directionalLight color={0xffffff} position={[0, size, 0]} />
      <directionalLight color={0xffffff} position={[size, size, 0]} />
      <directionalLight color={0xffffff} position={[0, size, size]} />
    </>
  );
};

export default SetupLights;
