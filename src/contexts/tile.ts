import { buildingFactory } from "./buildings";
import { TerrainType } from "./terrain";

export const createTile = (
  x: number,
  y: number
): {
  x: number;
  y: number;
  terrainType: TerrainType;
  building: buildingFactory;
} => {
  return {
    x,
    y,
    terrainType: "grass",
    building: { none: undefined },
  };
};
