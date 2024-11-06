import { BoxGeometry, Mesh, MeshLambertMaterial } from "three";
import { AssetId } from "../contexts/city-context";

const buildingGeom = new BoxGeometry(1, 1, 1);

const grassGeom = new BoxGeometry(1, 1, 1);

// Define a type for the asset keys

const assets: Record<
  AssetId,
  (
    tileIndex: number,
    x: number,
    y: number
  ) => Mesh<BoxGeometry, MeshLambertMaterial>
> = {
  grass: (tileIndex: number, x: number, y: number) => {
    const grassMaterial = new MeshLambertMaterial({ color: "green" });
    const tile = new Mesh(grassGeom, grassMaterial);
    tile.position.set(x, -0.5, y);
    tile.userData.id = "grass";
    tile.userData.tileIndex = tileIndex;
    return tile;
  },
  residential: (tileIndex: number, x: number, y: number) => {
    const buildingMaterial = new MeshLambertMaterial({ color: 0x00ff00 });
    const building = new Mesh(buildingGeom, buildingMaterial);
    building.position.set(x, 1 / 2, y);
    building.userData.id = "residential";
    building.userData.tileIndex = tileIndex;
    return building;
  },
  commercial: (tileIndex: number, x: number, y: number) => {
    const buildingMaterial = new MeshLambertMaterial({ color: 0x0000ff });
    const building = new Mesh(buildingGeom, buildingMaterial);
    building.position.set(x, 0.5, y);
    building.userData.id = "commercial";
    building.userData.tileIndex = tileIndex;
    return building;
  },
  industrial: (tileIndex: number, x: number, y: number) => {
    const buildingMaterial = new MeshLambertMaterial({ color: 0xffff00 });
    const building = new Mesh(buildingGeom, buildingMaterial);
    building.position.set(x, 0.5, y);
    building.userData.id = "industrial";
    building.userData.tileIndex = tileIndex;
    return building;
  },
  road: (tileIndex: number, x: number, y: number) => {
    const buildingMaterial = new MeshLambertMaterial({ color: 0x444440 });
    const building = new Mesh(buildingGeom, buildingMaterial);
    building.position.set(x, 0.05, y);
    building.scale.set(1, 0.1, 1);
    building.userData.id = "road";
    building.userData.tileIndex = tileIndex;
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
  y: number
) => {
  return assets[assetId](tileIndex, x, y);
};
