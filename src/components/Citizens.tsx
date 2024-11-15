import { useCity } from "../contexts/city-context";
import { useFrame } from "@react-three/fiber";
import { Citizen } from "../contexts/citizen";
import { getCitizensOfBuilding } from "../helpers/game-helper";
import { Building } from "../contexts/buildings";

const Citizens = () => {
  const { buildingObjects, addCitizens, citizens } = useCity();

  useFrame(() => {
    const allCitizens: Citizen[] = [];

    buildingObjects.forEach((obj) => {
      if (obj.userData.building) {
        const building = obj.userData.building as Building;

        if (!building) return;

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
