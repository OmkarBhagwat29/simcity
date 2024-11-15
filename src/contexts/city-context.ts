import { createContext, useContext } from "react";
import { Mesh, Object3D } from "three";
import { Citizen } from "./citizen";
import { City } from "./city";

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
  city: City | null;
  setCity: (city: City) => void;
  buildingObjects: Object3D[];
  addBuildingObjects: (obj: Object3D[]) => void;
  removeBuildingObjects: (obj: Object3D[]) => void;
  assetId: AssetId | undefined;
  setAssetId: (assetId: AssetId | undefined) => void;
  commandId: CommandId | undefined;
  setCommandId: (command: CommandId) => void;
  play: boolean;
  setPlay: (play: boolean) => void;

  enablePan: boolean;
  setEnablePan: (enable: boolean) => void;
  citizens: Citizen[];
  addCitizens: (citizen: Citizen[]) => void;
  setSelectedObject: (object: Object3D) => void;
  selectedObject: Object3D | null;
  models: Object3D[] | null;
  setModels: (models: Object3D[]) => void;
}

export const CityContext = createContext<CityContextProps>({
  city: null,
  setCity: () => {},
  buildingObjects: [],
  addBuildingObjects: () => {},
  removeBuildingObjects: () => {},
  assetId: undefined,
  setAssetId: () => {},
  commandId: undefined,
  setCommandId: () => {},
  play: true,
  setPlay: () => {},
  enablePan: true,
  setEnablePan: () => {},
  citizens: [],
  addCitizens: () => {},
  selectedObject: null,
  setSelectedObject: () => {},
  models: [],
  setModels: () => {},
});

export const useCity = () => {
  return useContext(CityContext);
};

export const CityProvider = CityContext.Provider;
