import { Mesh } from "three";

export const setEmissive = (mesh: Mesh, hexString: string) => {
  if (mesh.material.length) {
    mesh.material.forEach((mat) => mat.emissive.setHex(hexString));
  } else {
    mesh.material.emissive.setHex(hexString);
  }
};
