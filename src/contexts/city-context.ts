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
  | "select"
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
  assetId: AssetId | undefined;
  setAssetId: (assetId: AssetId | undefined) => void;
  commandId: CommandId | undefined;
  setCommandId: (command: CommandId) => void;
  play: boolean;
  setPlay: (play: boolean) => void;
  infoDiv: HTMLDivElement | null;
  setInfoDiv: (div: HTMLDivElement) => void;
}

export const CityContext = createContext<CityContextProps>({
  size: 0,
  tiles: [],
  addTileObjects: () => {},
  buildingObjects: [],
  addBuildingObjects: () => {},
  removeBuildingObjects: () => {},
  assetId: undefined,
  setAssetId: () => {},
  commandId: undefined,
  setCommandId: () => {},
  play: true,
  setPlay: () => {},
  infoDiv: null,
  setInfoDiv: () => {},
});

export const useCity = () => {
  return useContext(CityContext);
};

export const CityProvider = CityContext.Provider;
