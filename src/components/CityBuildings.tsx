import React, { useEffect } from "react";
import { useCity } from "../contexts/city-context";
import { useCityBuildings } from "../hooks/useCityBuildings";

const CityBuildings = () => {
  const { addBuildingObjects } = useCity();

  const buildings = useCityBuildings();

  useEffect(() => {
    if (buildings) {
      addBuildingObjects([buildings]);
    }
  }, [buildings]);

  return <></>;
};

export default CityBuildings;
