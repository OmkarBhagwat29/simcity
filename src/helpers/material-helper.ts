import { Mesh } from "three";

export const setEmissive = (mesh: Mesh, hexString: string) => {
  if (mesh.material.length) {
    mesh.material.forEach((mat) => mat.emissive.setHex(hexString));
  } else {
    mesh.material.emissive.setHex(hexString);
  }
};

export const setBaseColor = (mesh: Mesh, hexString: string) => {
  if (mesh.material.length) {
    mesh.material.forEach((mat) => mat.color.setHex(hexString));
  } else {
    mesh.material.color.setHex(hexString);
  }
};
