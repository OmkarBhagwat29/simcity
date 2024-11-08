import { createContext, useContext } from "react";
import { Object3D, Raycaster } from "three";
import { TerrainType } from "./terrain";

export interface Tile {
  terrainType: TerrainType;
  Object: Object3D;
}

export type AssetId =
  | "grass"
  | "residential"
  | "commercial"
  | "industrial"
  | "road";

export type CommandId =
  | "bulldoze"
  | "residential"
  | "commercial"
  | "industrial"
  | "road";

interface CityContextProps {
  size: number;
  tiles: Tile[];
  buildingObjects: Object3D[];
  addTileObjects: (tiles: Tile[]) => void;
  addBuildingObjects: (obj: Object3D[]) => void;
  removeBuildingObjects: (obj: Object3D[]) => void;
  raycaster: Raycaster;
  assetId: AssetId | undefined;
  setAssetId: (assetId: AssetId) => void;
  commandId: CommandId | undefined;
  setCommandId: (command: CommandId) => void;
}

export const CityContext = createContext<CityContextProps>({
  size: 0,
  tiles: [],
  addTileObjects: () => {},
  buildingObjects: [],
  addBuildingObjects: () => {},
  removeBuildingObjects: () => {},
  raycaster: new Raycaster(),
  assetId: undefined,
  setAssetId: () => {},
  commandId: undefined,
  setCommandId: () => {},
});

export const useCity = () => {
  return useContext(CityContext);
};

export const CityProvider = CityContext.Provider;
