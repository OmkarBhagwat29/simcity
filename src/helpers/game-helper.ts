import { Building } from "../contexts/buildings";
import { Citizen } from "../contexts/citizen";
import { Tile } from "../contexts/tile";

export const getCitizensOfBuilding = (building: Building): Citizen[] => {
  if (building.residents) {
    return building.residents;
  }

  return [];
};

export const findTile = (
  startTile: Tile,
  allTiles: Tile[][],
  searchCriterial: (tile: Tile) => boolean,
  maxDistance: number
): Tile | null => {
  const visited = new Set();

  const tilesToSearch: Tile[] = [];

  tilesToSearch.push(startTile);

  while (tilesToSearch.length > 0) {
    const tile = tilesToSearch.shift();

    if (!tile) break;

    if (visited.has(tile.uuid)) {
      continue;
    } else {
      visited.add(tile.uuid);
    }

    const distance = getDistance2D(startTile.x, startTile.y, tile.x, tile.y);

    if (distance > maxDistance) {
      continue;
    }

    if (searchCriterial(tile)) {
      return tile;
    } else {
      const neighbors = getTileNeighbors(tile, allTiles);
      // neighbors.forEach((n) => console.log(n.building?.type));

      tilesToSearch.push(...neighbors);
    }
  }

  return null;
};

export const getTileNeighbors = (tile: Tile, allTiles: Tile[][]) => {
  const neightbors: Tile[] = [];
  const x = tile.x;
  const y = tile.y;

  const size = allTiles.length;
  if (x > 0) {
    neightbors.push(allTiles[x - 1][y]);
  }

  if (x < size - 1) {
    neightbors.push(allTiles[x + 1][y]);
  }

  if (y > 0) {
    neightbors.push(allTiles[x][y - 1]);
  }

  if (y < size - 1) {
    neightbors.push(allTiles[x][y + 1]);
  }

  return neightbors;
};

export const getDistance2D = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  const dX = x1 - x2;
  const dY = y1 - y2;
  return Math.sqrt(dX * dX + dY * dY);
};
