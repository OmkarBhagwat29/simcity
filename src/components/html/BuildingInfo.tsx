import { Building } from "../../contexts/buildings";
import config from "../../contexts/config";
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
    <strong>Abandoned:</strong> {building.abandoned ? "Yes" : "No"} (
    {building.abandonDays}/{config.zone.abandonmentThreshold})
    <br />
    <strong>Road Access:</strong> {building.hasRoadAccess ? "Yes" : "No"}
    <br />
    <strong>Level:</strong> {building.height}
    <br />
    {building.type === "residential" && <ResidentialInfo building={building} />}
    {(building.type === "commercial" || building.type === "industrial") && (
      <CommercialInfo building={building} />
    )}
    <br />
  </>
);

export default BuildingInfo;
