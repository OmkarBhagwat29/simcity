import { Box, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

const Scene = () => {
  return (
    <>
      <Canvas style={{ backgroundColor: "darkGray" }}>
        <Box />
        <OrbitControls />
      </Canvas>
    </>
  );
};

export default Scene;
