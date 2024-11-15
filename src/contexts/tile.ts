import { TerrainType } from "./terrain";

export interface Tile {
  readonly uuid: string;
  terrain: TerrainType;
  readonly x: number;
  readonly y: number;
}

export const createTile = (
  x: number,
  y: number,
  terrain: TerrainType = "ground"
): Tile => {
  return {
    uuid: crypto.randomUUID(),
    terrain,
    x,
    y,
  };
};
