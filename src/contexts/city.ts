import { findTile } from "../helpers/game-helper";
import { Building } from "./buildings";
import { Tile } from "./tile";

export interface City {
  id: string;
  name: string;
  size: number;
  tiles: Tile[][];
  buildings: Building[][] | null[][];
  addBuilding: (building: Building) => void;
  addTile: (tile: Tile) => void;
  findTile: (
    x: number,
    y: number,
    searchCriterial: (tile: Tile) => boolean,
    maxDistance: number
  ) => Tile | null;
}

export const createCity = (
  size: number,
  cityName: string = "my city"
): City => {
  return {
    id: crypto.randomUUID(),
    name: cityName,
    size,
    tiles: Array.from({ length: size }, () => []),
    buildings: Array.from({ length: size }, () =>
      Array.from({ length: size }, () => null)
    ),

    addTile(tile: Tile) {
      if (!this.tiles[tile.x]) {
        this.tiles[tile.x] = [];
      }
      this.tiles[tile.x][tile.y] = tile;
    },

    addBuilding(building: Building) {
      if (!this.buildings[building.x]) {
        this.buildings[building.x] = [];
      }
      this.buildings[building.x][building.y] = building;
    },

    findTile(
      x: number,
      y: number,
      searchCriterial: (tile: Tile) => boolean,
      maxDistance: number
    ) {
      const tile = findTile(
        this.tiles[x][y],
        this.tiles,
        searchCriterial,
        maxDistance
      );

      return tile;
    },
  };
};
