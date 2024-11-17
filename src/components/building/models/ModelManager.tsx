import { useEffect, useState, useMemo } from "react";
import { Object3D } from "three";

import { ModelEntity, useCity } from "../../../contexts/city-context";
import model from "../../../assets/model";
import { OBJLoader } from "three/examples/jsm/Addons.js";
import { useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const modelNames = Object.keys(model);
const modelPaths = modelNames.map((name) => `./models/${model[name].filename}`);

const glbPaths: { name: string; path: string }[] = [];
const objPaths: { name: string; path: string }[] = [];

for (let i = 0; i < modelPaths.length; i++) {
  const extension = modelPaths[i].split(".").pop()?.toLocaleLowerCase();
  if (extension === "glb") {
    glbPaths.push({ name: modelNames[i], path: modelPaths[i] });
  } else if (extension === "obj") {
    objPaths.push({ name: modelNames[i], path: modelPaths[i] });
  }
}

const ModelManager = () => {
  const { addModels } = useCity();

  const gltfData = useGLTF(glbPaths.map((data) => data.path));
  const objData = useLoader(
    OBJLoader,
    objPaths.map((data) => data.path)
  );

  const gltfEntities: ModelEntity[] = useMemo(() => {
    return gltfData.map((data, index) => {
      const scene = data.scene;

      const name = glbPaths[index].name;
      const scale = model[name].scale;
      if (scale) {
        scene.scale.set(scale[0], scale[1], scale[2]);
      }

      return { name, scene };
    });
  }, [gltfData]);

  const objEntities: ModelEntity[] = useMemo(() => {
    return objData.map((data, index) => {
      const scene = data;

      const name = objPaths[index].name;
      const scale = model[name].scale;
      if (scale) {
        scene.scale.set(scale[0], scale[1], scale[2]);
      }

      return { name, scene };
    });
  }, [objData]);

  useEffect(() => {
    if (gltfEntities.length) {
      addModels(gltfEntities);
    }
  }, [gltfEntities]);

  useEffect(() => {
    if (objEntities.length) {
      addModels(objEntities);
    }
  }, [objEntities]);

  return null; // No visual rendering in this component
};

export default ModelManager;
