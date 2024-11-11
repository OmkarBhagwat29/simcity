import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { useCity } from "../contexts/city-context";
import SetupLights from "./SetupLights";

import { Perf } from "r3f-perf";

import City from "./city";
import UIPanel from "./ui/ui-panel";
import { MOUSE } from "three";
import { useEffect } from "react";

// Camera constants

const MIN_CAMERA_RADIUS = 0.1;
const MAX_CAMERA_RADIUS = 35;
const MIN_CAMERA_ELEVATION = Math.PI / 4; // 45 degrees in radians
const MAX_CAMERA_ELEVATION = Math.PI / 4; // 45 degrees in radians
const AZIMUTH_SENSITIVITY = 0.2;
const ZOOM_SENSITIVITY = 1;
const PAN_SENSITIVITY = 1;

const CityScene = () => {
  const { size, enablePan } = useCity();

  return (
    <>
      <UIPanel />
      <Canvas
        shadows
        style={{ backgroundColor: "darkGray" }}
        camera={{
          fov: 45,
          position: [-6.95, 9.27, 8.58],
          rotation: [
            -1.1307728748867096, -0.6736392615412291, -0.9242926137800345,
          ],
        }}
      >
        <Perf />
        <OrbitControls
          maxPolarAngle={MAX_CAMERA_ELEVATION}
          minPolarAngle={MIN_CAMERA_ELEVATION}
          minDistance={MIN_CAMERA_RADIUS}
          maxDistance={MAX_CAMERA_RADIUS}
          rotateSpeed={AZIMUTH_SENSITIVITY}
          zoomSpeed={ZOOM_SENSITIVITY}
          panSpeed={PAN_SENSITIVITY}
          target={[size / 2, 0, size / 2]}
          enablePan={enablePan}
          // enableZoom
          mouseButtons={{
            LEFT: MOUSE.PAN, // Pan with left click
            //MIDDLE: THREE.MOUSE.PAN, // Pan with middle click
            RIGHT: MOUSE.ROTATE, // Rotate with right click
          }}
        />

        <City />
        {/* <axesHelper scale={15} /> */}
        <SetupLights />
      </Canvas>
    </>
  );
};

export default CityScene;
