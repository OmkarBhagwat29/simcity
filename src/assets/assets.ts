import { BoxGeometry, Mesh, MeshLambertMaterial } from "three";
import { AssetId } from "../contexts/city-context";
import { BuildingType } from "../contexts/buildings";

const buildingGeom = new BoxGeometry(1, 1, 1);

const grassGeom = new BoxGeometry(1, 1, 1);

// Define a type for the asset keys

const assets: Record<
  AssetId,
  (
    tileIndex: number,
    x: number,
    y: number,
    data: BuildingType
  ) => Mesh<BoxGeometry, MeshLambertMaterial>
> = {
  grass: (tileIndex: number, x: number, y: number) => {
    const grassMaterial = new MeshLambertMaterial({ color: "green" });
    const tile = new Mesh(grassGeom, grassMaterial);
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
    const buildingMaterial = new MeshLambertMaterial({ color: 0x00ff00 });
    const building = new Mesh(buildingGeom, buildingMaterial);
    building.scale.set(0.8, data.height, 0.8);
    building.position.set(x, data.height / 2, y);
    building.userData.tileIndex = tileIndex;
    building.receiveShadow = true;
    building.castShadow = true;
    return building;
  },
  commercial: (tileIndex: number, x: number, y: number, data: BuildingType) => {
    const buildingMaterial = new MeshLambertMaterial({ color: 0x0000ff });
    const building = new Mesh(buildingGeom, buildingMaterial);
    building.scale.set(0.8, data.height, 0.8);
    building.position.set(x, data.height / 2, y);
    building.userData.tileIndex = tileIndex;
    building.receiveShadow = true;
    building.castShadow = true;
    return building;
  },
  industrial: (tileIndex: number, x: number, y: number, data: BuildingType) => {
    const buildingMaterial = new MeshLambertMaterial({ color: 0xffff00 });
    const building = new Mesh(buildingGeom, buildingMaterial);
    building.scale.set(0.8, data.height, 0.8);
    building.position.set(x, data.height / 2, y);
    building.userData.tileIndex = tileIndex;
    building.receiveShadow = true;
    building.castShadow = true;
    return building;
  },
  road: (tileIndex: number, x: number, y: number, data: BuildingType) => {
    const buildingMaterial = new MeshLambertMaterial({ color: 0x444440 });
    const building = new Mesh(buildingGeom, buildingMaterial);
    building.position.set(x, 0.05, y);
    building.scale.set(1, 0.1, 1);
    building.userData.tileIndex = tileIndex;

    building.receiveShadow = true;
    return building;
  },

  bulldoze: (tileIndex: number, x: number, y: number) => {
    return new Mesh();
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
