import { useRef } from "react";
import { DirectionalLight } from "three";

const SetupLights = () => {
  const camRef = useRef<DirectionalLight | null>(null);

  return (
    <>
      <ambientLight color={0xffffff} intensity={1} />

      <directionalLight
        ref={camRef}
        intensity={3}
        color={0xffffff}
        position={[20, 20, 20]}
        castShadow
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
      />

      {/* {camRef.current && <cameraHelper args={[camRef.current.shadow.camera]} />} */}
    </>
  );
};

export default SetupLights;
