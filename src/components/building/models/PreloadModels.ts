import { useGLTF } from "@react-three/drei";
import model from "../../../assets/model";

export const preloadModels = () => {
  Object.values(model).forEach((entry) => {
    if (entry.filename) {
      useGLTF.preload(`./models/${entry.filename}`);
    }
  });
};
