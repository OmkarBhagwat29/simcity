import {
  BoxGeometry,
  Mesh,
  MeshLambertMaterial,
  RepeatWrapping,
  SRGBColorSpace,
  TextureLoader,
} from "three";
import { AssetId } from "../contexts/city-context";
import { Building } from "../contexts/buildings";

const geom = new BoxGeometry(1, 1, 1);

const textureLoader = new TextureLoader();

//"./textures/grass/Stylized_Grass_003_basecolor.jpg"
const loadTextrue = (url: string) => {
  const texture = textureLoader.load(url);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(1, 1);
  return texture;
};

const grassTexture = loadTextrue(
  "./textures/grass/Stylized_Grass_003_basecolor.jpg"
);

const textures = {
  residential1: loadTextrue("./textures/buildings/residential_1.png"),
  residential2: loadTextrue("./textures/buildings/residential_2.png"),
  residential3: loadTextrue("./textures/buildings/residential_3.png"),
  commercial1: loadTextrue("./textures/buildings/commercial_1.png"),
  commercial2: loadTextrue("./textures/buildings/commercial_2.png"),
  commercial3: loadTextrue("./textures/buildings/commercial_3.png"),
  industrial1: loadTextrue("./textures/buildings/industrial_1.png"),
  industrial2: loadTextrue("./textures/buildings/industrial_2.png"),
  industrial3: loadTextrue("./textures/buildings/industrial_3.png"),
};

// Define a union type of the valid keys
type TextureName = keyof typeof textures;

const getTopMaterial = () => {
  return new MeshLambertMaterial({ color: 0x555555 });
};

const getSideMaterial = (textureName: TextureName) => {
  return new MeshLambertMaterial({ map: textures[textureName].clone() });
};

const createZoneMesh = (x: number, y: number, data: Building) => {
  const textureName = data.type + data.style;

  const topMaterial = getTopMaterial();
  const sideMaterial = getSideMaterial(textureName as TextureName);

  const materialArray = [
    sideMaterial,
    sideMaterial,
    topMaterial,
    topMaterial,
    sideMaterial,
    sideMaterial,
  ];

  const mesh = new Mesh(geom, materialArray);

  mesh.scale.set(0.8, (data.height - 0.95) / 2, 0.8);
  mesh.material.forEach((material) =>
    material.map?.repeat.set(1, data.height - 1)
  );
  mesh.position.set(x, (data.height - 0.95) / 4, y);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  return mesh;
};

const assets: Record<
  AssetId,
  (
    x: number,
    y: number,
    data: Building
  ) => Mesh<BoxGeometry, MeshLambertMaterial | MeshLambertMaterial[]>
> = {
  grass: (x: number, y: number) => {
    const grassMaterial = new MeshLambertMaterial({
      color: "green",
      map: grassTexture,
    });
    const tile = new Mesh(geom, grassMaterial);
    tile.position.set(x, -0.5, y);
    tile.receiveShadow = true;
    return tile;
  },
  residential: (x: number, y: number, data: Building) => {
    return createZoneMesh(x, y, data);
  },
  commercial: (x: number, y: number, data: Building) => {
    return createZoneMesh(x, y, data);
  },
  industrial: (x: number, y: number, data: Building) => {
    return createZoneMesh(x, y, data);
  },
  road: (x: number, y: number, data: Building) => {
    const buildingMaterial = new MeshLambertMaterial({ color: 0x444440 });
    const mesh = new Mesh(geom, buildingMaterial);
    mesh.position.set(x, 0.05, y);
    mesh.scale.set(1, 0.1, 1);
    mesh.receiveShadow = true;
    return mesh;
  },
};

export const createAssetInstance = (
  assetId: AssetId,
  x: number,
  y: number,
  data: Building
) => {
  return assets[assetId](x, y, data);
};
