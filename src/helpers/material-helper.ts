import { Mesh, Object3D } from "three";

export const setEmissive = (mesh: Mesh, hexString: string) => {
  if (mesh.material.length) {
    mesh.material.forEach((mat) => mat.emissive.setHex(hexString));
  } else {
    mesh.material.emissive.setHex(hexString);
  }
};

export const setObjectEmissive = (obj: Object3D, hexString: string) => {
  obj.children.forEach((child) => {
    setObjectEmissive(child, hexString);
  });
  if (obj instanceof Mesh) {
    setEmissive(obj, hexString);
    return;
  }
};

export const setBaseColor = (mesh: Mesh, hexString: string) => {
  if (mesh.material.length) {
    mesh.material.forEach((mat) => mat.color.setHex(hexString));
  } else {
    mesh.material.color.setHex(hexString);
  }
};
