import { createContext, useContext } from "react";
import { Object3D } from "three";
import { TerrainType } from "./terrain";
import { Citizen } from "./citizen";

export interface Tile {
  terrainType: TerrainType;
  Object: Object3D;
}

export type AssetId =
  | "residential"
  | "commercial"
  | "industrial"
  | "road"
  | "grass";

export type CommandId =
  | "select"
  | "bulldoze"
  | "residential"
  | "commercial"
  | "industrial"
  | "road"
  | undefined;

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
  enablePan: boolean;
  setEnablePan: (enable: boolean) => void;
  citizens: Citizen[];
  addCitizens: (citizen: Citizen[]) => void;
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
  enablePan: true,
  setEnablePan: () => {},
  citizens: [],
  addCitizens: () => {},
});

export const useCity = () => {
  return useContext(CityContext);
};

export const CityProvider = CityContext.Provider;
