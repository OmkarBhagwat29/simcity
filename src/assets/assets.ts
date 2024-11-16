import {
  BoxGeometry,
  Mesh,
  MeshLambertMaterial,
  RepeatWrapping,
  SRGBColorSpace,
  TextureLoader,
} from "three";


const geom = new BoxGeometry(1, 1, 1);

export const createRoad = (x: number, y: number) => {
  const buildingMaterial = new MeshLambertMaterial({ color: 0x444440 });
  const mesh = new Mesh(geom, buildingMaterial);
  mesh.position.set(x, 0.05, y);
  mesh.scale.set(1, 0.1, 1);
  mesh.receiveShadow = true;
  return mesh;
};

const textureLoader = new TextureLoader();

const loadTextrue = (url: string) => {
  const texture = textureLoader.load(url);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(1, 1);
  return texture;
};

const grassTexture = loadTextrue("./textures/grass/grass.jpg");

export const createGrass = (x: number, y: number) => {
  const grassMaterial = new MeshLambertMaterial({
    color: "green",
    map: grassTexture,
  });
  const tile = new Mesh(geom, grassMaterial);
  tile.position.set(x, -0.5, y);
  tile.receiveShadow = true;
  return tile;
};
