import { Building } from "../../contexts/buildings";
import CommercialInfo from "./CommercialInfo";
import ResidentialInfo from "./ResidentialInfo";

export const BuildingInfo = ({ building }: { building: Building }) => (
  <>
    <br />
    <strong>Building</strong>
    <br />
    <strong>Type:</strong> {building.type}
    <br />
    <strong>Style:</strong> {building.style}
    <br />
    <strong>Height:</strong> {building.height}
    <br />
    {building.type === "residential" && <ResidentialInfo building={building} />}
    {(building.type === "commercial" || building.type === "industrial") && (
      <CommercialInfo building={building} />
    )}
    <br />
  </>
);

export default BuildingInfo;
