import { Citizen } from "../../contexts/citizen";

export const CitizenInfo = ({ resident }: { resident: Citizen }) => (
  <li>
    <strong>Name:</strong> {resident.name} (Age:{resident.age} | State:{" "}
    {resident.state})
    <ul
      style={{
        paddingLeft: "16px",
        fontSize: "small",
        listStyleType: "circle",
      }}
    >
      <li>
        <strong>Job:</strong> {resident.job?.name ?? "N/A"}
      </li>
    </ul>
  </li>
);

export default CitizenInfo;
