import { useEffect } from "react";
import { preloadModels } from "./PreloadModels";
import { useGLTF } from "@react-three/drei";
import { modelPaths, modelName } from "./ModelPaths";
import { useCity } from "../../../contexts/city-context";

const ModelManager = () => {
  const { setModels } = useCity();

  preloadModels();

  const modelKey: modelName = "construction-small";
  const underConModel = useGLTF(modelPaths[modelKey]);

  useEffect(() => {
    const scene = underConModel.scene;
    scene.name = modelKey;
    scene.castShadow = true;
    scene.receiveShadow = true;
    scene.scale.set(0.1, 0.5, 0.1);

    setModels([scene]);
  }, [underConModel]);

  return <></>;
};

export default ModelManager;
