
import { Building } from "../../contexts/buildings";
import CitizenInfo from "./CitizenInfo";

const ResidentialInfo = ({ building }: { building: Building }) => {
  return (
    <>
      <strong>Current Residents:</strong> {building.residents?.length || 0}
      <br />
      {building.residents && building.residents.length > 0 ? (
        <>
          <br />
          <strong>Residents:</strong>
          <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            {building.residents.map((resident, index) => (
              <CitizenInfo key={index} resident={resident} />
            ))}
          </ul>
        </>
      ) : (
        <>
          <br />
          <em>No residents</em>
        </>
      )}
    </>
  );
};

export default ResidentialInfo;
