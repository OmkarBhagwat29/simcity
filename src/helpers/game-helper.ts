import { BuildingType } from "../contexts/buildings";
import { Citizen } from "../contexts/citizen";

export const getCitizensOfBuilding = (building: BuildingType): Citizen[] => {
  if (building.residents) {
    return building.residents;
  }

  return [];
};
