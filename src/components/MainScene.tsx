import { OrbitControls, Sky } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";

import SetupLights from "./SetupLights";

import { Perf } from "r3f-perf";

import { MOUSE } from "three";
import City from "./City";
import { useEffect, useState } from "react";

const MIN_CAMERA_RADIUS = 0.1;
const MAX_CAMERA_RADIUS = 35;
const MIN_CAMERA_ELEVATION = Math.PI / 4; // 45 degrees in radians
const MAX_CAMERA_ELEVATION = Math.PI / 4; // 45 degrees in radians
const AZIMUTH_SENSITIVITY = 0.2;
const ZOOM_SENSITIVITY = 0.75;
const PAN_SENSITIVITY = 1;

const CustomOrbitControls = () => {
  const { camera, gl } = useThree();

  const [isShiftPressed, setShiftPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Shift") {
        console.log("shift pressed");
        setShiftPressed(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Shift") {
        console.log("shift not pressed");
        setShiftPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      console.log("pan removed");
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <OrbitControls
      args={[camera, gl.domElement]}
      maxPolarAngle={MAX_CAMERA_ELEVATION}
      minPolarAngle={MIN_CAMERA_ELEVATION}
      minDistance={MIN_CAMERA_RADIUS}
      maxDistance={MAX_CAMERA_RADIUS}
      rotateSpeed={AZIMUTH_SENSITIVITY}
      zoomSpeed={ZOOM_SENSITIVITY}
      panSpeed={PAN_SENSITIVITY}
      target={[16 / 2, 0, 16 / 2]}
      enablePan={isShiftPressed} // Enable pan only when Shift is pressed
      enableRotate={isShiftPressed ? false : true}
      mouseButtons={{
        RIGHT: MOUSE.ROTATE, // Pan with Shift + Right-click
        MIDDLE: MOUSE.DOLLY,
        LEFT: MOUSE.PAN,
      }}
    />
  );
};

const MainScene = () => {
  return (
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
      {/* <Sky /> */}
      <CustomOrbitControls />
      <City />
      <axesHelper scale={50} />
      <SetupLights />
    </Canvas>
  );
};

export default MainScene;
