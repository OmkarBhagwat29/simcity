import { Building } from "./buildings";
import { City } from "./city";
import config from "./config";
import { Tile } from "./tile";

export type EmploymentStatus = "unemployed" | "employed" | "retired";

export type Citizen = {
  id: string;
  name: string;
  age: number;
  building: Building;
  update: (city: City) => void;
  state: EmploymentStatus;
  stateCounter: number;
  job: Building | null;
  readonly findJob: (city: City) => Building | null;
};

export const createCitizen = (building: Building): Citizen => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return {
    id: crypto.randomUUID(),
    name: `${firstName} ${lastName}`,
    age: Math.floor(Math.random() * 100) + 1,
    building,
    update(city: City) {
      switch (this.state) {
        case "unemployed":
          if (this.age >= config.citizen.retirementAge) {
            this.state = "retired";
            this.job = null;
            return;
          }
          this.job = this.findJob(city);

          if (this.job) {
            this.state = "employed";
          }
          break;
        case "employed":
          //action - none

          //transition
          if (!this.job) {
            this.state = "unemployed";
          }
          break;
        case "retired":
          this.job = null;
          return;
        default:
        //console.log("unkonw employmnet status");
      }
    },
    state: "unemployed",
    stateCounter: 0,
    job: null,

    findJob(city: City) {
      const tile = city.findTile(
        this.building.x,
        this.building.y,
        (tile: Tile) => {
          if (!tile || !tile.building) {
            return false;
          }

          if (
            tile.building.type === "commercial" ||
            tile.building.type === "industrial"
          ) {
            if (tile.building.numberOfJobsAvailable!() > 0) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        },
        config.citizen.maxJobSearchDistance
      );

      if (tile) {
        tile.building!.workers!.push(this);
        return tile.building!;
      }

      return null;
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
