import { useCity } from "../contexts/city-context";
import { useFrame } from "@react-three/fiber";
import { Citizen } from "../contexts/citizen";
import { getCitizensOfBuilding } from "../helpers/game-helper";
import { BuildingType } from "../contexts/buildings";

const Citizens = () => {
  const { tiles, addCitizens, citizens } = useCity();

  useFrame(() => {
    const allCitizens: Citizen[] = [];

    tiles.forEach((tile) => {
      if (tile.Object.userData.building) {
        allCitizens.push(
          ...getCitizensOfBuilding(
            tile.Object.userData.building as BuildingType
          )
        );
      }
    });

    if (allCitizens.length !== citizens.length) {
      addCitizens(allCitizens);
    }
  });

  return <></>;
};

export default Citizens;
