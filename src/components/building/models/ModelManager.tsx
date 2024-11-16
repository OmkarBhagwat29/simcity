import { useEffect, useMemo } from "react";

import { useGLTF } from "@react-three/drei";

import { ModelEntity, useCity } from "../../../contexts/city-context";

import model from "../../../assets/model";

const ModelManager = () => {
  const { setModels } = useCity();

  const modelNames: string[] = useMemo(() => {
    return Object.keys(model); // Get property names
  }, []);

  const modelPaths = useMemo(() => {
    return modelNames.map((name) => {
      const filePath = `./models/${model[name].filename}`;
      return filePath;
    });
  }, [modelNames]);

  // Load each model dynamically
  const models = useGLTF(modelPaths);

  useEffect(() => {
    if (!models.length) return;

    if (models.length === modelPaths.length) {
      const entities: ModelEntity[] = Object.values(model).map(
        (item, index) => {
          const scene = models[index].scene;

          if (item.scale) {
            scene.scale.set(item.scale[0], item.scale[1], item.scale[2]);
          }

          return { name: modelNames[index], scene };
        }
      );

      setModels(entities);
    }
  }, [models]);

  return <></>;
};

export default ModelManager;
