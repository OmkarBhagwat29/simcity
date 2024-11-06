import { createContext, useContext } from "react";
import { Object3D, Raycaster } from "three";

export interface BuildingStage {
  name: string;
  height: number;
}

export interface Tile {
  terrainType: TerrainType;
  Object: Object3D;
}

export type TerrainType = "grass" | "river";

interface CityContextProps {
  size: number;
  tiles: Tile[];
  buildingObjects: Object3D[];
  buildingStage: BuildingStage[];
  addTileObjects: (tiles: Tile[]) => void;
  addBuildingObjects: (obj: Object3D[]) => void;
  raycaster: Raycaster;
  onObjectSelected: (obj: Object3D) => void;
}

export const CityContext = createContext<CityContextProps>({
  size: 0,
  tiles: [],
  addTileObjects: () => {},
  buildingObjects: [],
  addBuildingObjects: () => {},
  buildingStage: [],
  onObjectSelected: () => {},
  raycaster: new Raycaster(),
});

export const useCity = () => {
  return useContext(CityContext);
};

export const CityProvider = CityContext.Provider;
