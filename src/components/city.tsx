import CityTiles from "./cityTiles";
import CityBuildings from "./CityBuildings";
import VisualiseObjects from "./VisualiseObjects";
import MouseInteraction from "./MouseInteraction";

const City = () => {
  return (
    <>
      <CityTiles />
      <CityBuildings />
      <VisualiseObjects />
      {/* <MouseInteraction /> */}
    </>
  );
};

export default City;
