import { Citizen } from "../../contexts/citizen";

export const CitizenInfo = ({ resident }: { resident: Citizen }) => (
  <li>
    <strong>Name:</strong> {resident.name}
    <ul
      style={{
        paddingLeft: "16px",
        fontSize: "small",
        listStyleType: "circle",
      }}
    >
      <li>
        <strong>Age:</strong> {resident.age}
      </li>
      <li>
        <strong>Job:</strong> {resident.job?.name ?? "Unemployed"}
      </li>
    </ul>
  </li>
);

export default CitizenInfo;
