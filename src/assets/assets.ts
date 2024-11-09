import {
  BoxGeometry,
  Mesh,
  MeshLambertMaterial,
  RepeatWrapping,
  SRGBColorSpace,
  TextureLoader,
} from "three";
import { AssetId } from "../contexts/city-context";
import { BuildingType } from "../contexts/buildings";

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

grassTexture.repeat.set(4, 4);

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

const createZoneMesh = (
  tileIndex: number,
  x: number,
  y: number,
  data: BuildingType
) => {
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

  mesh.userData.tileIndex = tileIndex;
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
    tileIndex: number,
    x: number,
    y: number,
    data: BuildingType
  ) => Mesh<BoxGeometry, MeshLambertMaterial | MeshLambertMaterial[]>
> = {
  grass: (tileIndex: number, x: number, y: number) => {
    const grassMaterial = new MeshLambertMaterial({
      color: "green",
      map: grassTexture,
    });
    const tile = new Mesh(geom, grassMaterial);
    tile.position.set(x, -0.5, y);
    tile.userData.tileIndex = tileIndex;
    tile.receiveShadow = true;
    return tile;
  },
  residential: (
    tileIndex: number,
    x: number,
    y: number,
    data: BuildingType
  ) => {
    return createZoneMesh(tileIndex, x, y, data);
  },
  commercial: (tileIndex: number, x: number, y: number, data: BuildingType) => {
    return createZoneMesh(tileIndex, x, y, data);
  },
  industrial: (tileIndex: number, x: number, y: number, data: BuildingType) => {
    return createZoneMesh(tileIndex, x, y, data);
  },
  road: (tileIndex: number, x: number, y: number, data: BuildingType) => {
    const buildingMaterial = new MeshLambertMaterial({ color: 0x444440 });
    const building = new Mesh(geom, buildingMaterial);
    building.position.set(x, 0.05, y);
    building.scale.set(1, 0.1, 1);
    building.userData.tileIndex = tileIndex;

    building.receiveShadow = true;
    return building;
  },
};

export const createAssetInstance = (
  assetId: AssetId,
  tileIndex: number,
  x: number,
  y: number,
  data: BuildingType
) => {
  return assets[assetId](tileIndex, x, y, data);
};
