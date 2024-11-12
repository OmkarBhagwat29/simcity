import { useCity } from "../contexts/city-context";
import { useFrame } from "@react-three/fiber";
import { Citizen } from "../contexts/citizen";
import { getCitizensOfBuilding } from "../helpers/game-helper";
import { Building } from "../contexts/buildings";
import { Tile } from "../contexts/tile";

const Citizens = () => {
  const { buildingObjects, addCitizens, citizens } = useCity();

  useFrame(() => {
    const allCitizens: Citizen[] = [];

    buildingObjects.forEach((obj) => {
      if (obj.userData.tile) {
        const tile = obj.userData.tile as Tile;

        if (!tile.building) return;

        const building = tile.building as Building;

        allCitizens.push(...getCitizensOfBuilding(building));
      }
    });

    if (allCitizens.length !== citizens.length) {
      addCitizens(allCitizens);
    }
  });

  return <></>;
};

export default Citizens;
