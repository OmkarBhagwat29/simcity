import { BuildingType } from "./buildings";

export type Citizen = {
  id: string;
  name: string;
  age: number;
  building: BuildingType;
  update: () => void;
};

export const createCitizen = (building: BuildingType): Citizen => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return {
    id: crypto.randomUUID(),
    name: `${firstName} ${lastName}`,
    age: Math.floor(Math.random() * 100) + 1,
    building,
    update() {
      // Add update logic here if needed
    },
  };
};

const firstNames = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Eve",
  "Frank",
  "Grace",
  "Hank",
  "Ivy",
  "Jack",
  "Kara",
  "Leo",
  "Mona",
  "Nina",
  "Oscar",
  "Paul",
  "Quinn",
  "Rose",
  "Sam",
  "Tina",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Brown",
  "Taylor",
  "Anderson",
  "Thomas",
  "Jackson",
  "White",
  "Harris",
  "Martin",
  "Thompson",
  "Garcia",
  "Martinez",
  "Robinson",
  "Clark",
  "Rodriguez",
  "Lewis",
  "Lee",
  "Walker",
  "Hall",
];
