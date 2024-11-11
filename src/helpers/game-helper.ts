import { BuildingType } from "../contexts/buildings";
import { Citizen } from "../contexts/citizen";
import { Tile } from "../contexts/city-context";

export const getCitizensOfBuilding = (building: BuildingType): Citizen[] => {
  if (building.residents) {
    return building.residents;
  }

  return [];
};

export const toHTML = (tile: Tile) => {
  const obj = tile.Object;
  const pos = obj.position;
  let html = ``;

  html += `Coordinates: (X:${Math.round(pos.x)} Y:${Math.round(pos.z)}) <br>`;

  html += `Terrain: ${tile.terrainType}<br>`;

  if (obj.userData.building) {
    //convert building to html

    const building = obj.userData.building as BuildingType;

    html += toBuildingHTML(building);
  }

  return html;
};

export const toBuildingHTML = (building: BuildingType) => {
  let html = `<br><strong>Building</strong><br>`;

  html += `<strong>Type:</strong> ${building.type}<br>`;
  html += `<strong>Style:</strong> ${building.style}<br>`;
  html += `<strong>Height:</strong> ${building.height}<br>`;
  html += `<strong>Current Residents:</strong> ${
    building.residents?.length || 0
  }<br>`;

  if (building.residents && building.residents.length > 0) {
    html += `<br><strong>Residents:</strong><ul style="list-style-type: none; padding-left: 0;">`;
    building.residents.forEach((resident) => {
      html += `${resident.name}  |  <strong>Age:</strong> ${resident.age}<br>`;
    });
    html += `</ul>`;
  } else {
    html += `<br><em>No residents</em>`;
  }

  return html;
};
