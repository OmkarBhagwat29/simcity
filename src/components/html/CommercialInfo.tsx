import React from "react";
import { Building } from "../../contexts/buildings";
import CitizenInfo from "./CitizenInfo";

const CommercialInfo = ({ building }: { building: Building }) => {
  return (
    <>
      <strong>Name: </strong>
      {building.name}
      <br />
      <br />
      <strong>
        Workers: {building.numberOfJobsFilled!()}/{building.maxWorkers}
      </strong>
      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        {building.workers &&
          building.workers.map((resident, index) => (
            <CitizenInfo key={index} resident={resident} />
          ))}
      </ul>
      <br />
    </>
  );
};

export default CommercialInfo;
