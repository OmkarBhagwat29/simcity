import {
  BoxGeometry,
  Mesh,
  MeshLambertMaterial,
  MeshStandardMaterial,
} from "three";

const buildingGeom = new BoxGeometry(1, 1, 1);

const grassGeom = new BoxGeometry(1, 1, 1);

// Define a type for the asset keys
type AssetId = "grass" | "stage-1" | "stage-2" | "stage-3";

const assets: Record<
  AssetId,
  (x: number, y: number) => Mesh<BoxGeometry, MeshLambertMaterial>
> = {
  grass: (x: number, y: number) => {
    const grassMaterial = new MeshLambertMaterial({ color: "green" });
    const tile = new Mesh(grassGeom, grassMaterial);
    tile.position.set(x, -0.5, y);
    tile.userData.id = "grass";
    return tile;
  },
  "stage-1": (x: number, y: number) => {
    const buildingMaterial = new MeshLambertMaterial({ color: 0x2f4f4f });
    const building = new Mesh(buildingGeom, buildingMaterial);
    building.position.set(x, 1 / 2, y);
    building.userData.id = "stage-1";
    return building;
  },
  "stage-2": (x: number, y: number) => {
    const buildingMaterial = new MeshLambertMaterial({ color: 0x2f4f4f });
    const building = new Mesh(buildingGeom, buildingMaterial);
    building.position.set(x, 2 / 2, y);
    building.scale.set(1, 2, 1);
    building.userData.id = "stage-2";
    return building;
  },
  "stage-3": (x: number, y: number) => {
    const buildingMaterial = new MeshLambertMaterial({ color: 0x2f4f4f });
    const building = new Mesh(buildingGeom, buildingMaterial);
    building.position.set(x, 3 / 2, y);
    building.scale.set(1, 3, 1);
    building.userData.id = "stage-3";
    return building;
  },
};

export const createAssetInstance = (assetId: AssetId, x: number, y: number) => {
  return assets[assetId](x, y);
};
