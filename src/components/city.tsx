import CityBuildings from "./CityBuildings";
import VisualiseObjects from "./VisualiseObjects";
import Citizens from "./citizens";
import CityTiles from "./cityTiles";

const City = () => {
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
