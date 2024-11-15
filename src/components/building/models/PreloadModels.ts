import { useGLTF } from "@react-three/drei";
import { modelPaths } from "./ModelPaths";

export const preloadModels = () => {
  useGLTF.preload(modelPaths["construction-small"]);
};
