import { useEffect } from "react";
import Citizens from "./Citizens";
import CityBuildings from "./CityBuildings";
import CityTiles from "./CityTiles";
import VisualiseObjects from "./VisualiseObjects";
import { useCity } from "../contexts/city-context";
import { createCity } from "../contexts/city";

const City = () => {
  const citySize = 16;
  const { setCity } = useCity();

  useEffect(() => {
    const city = createCity(citySize);

    setCity(city);
  }, []);

  return (
    <>
      <CityTiles />
      <CityBuildings />
      <Citizens />

      <VisualiseObjects />
    </>
  );
};

export default City;
