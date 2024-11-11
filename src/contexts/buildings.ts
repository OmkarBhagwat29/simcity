import { Citizen, createCitizen } from "./citizen";
import { AssetId } from "./city-context";

export type BuildingType = {
  uuid: string;
  residents?: Citizen[];
  maxResidents?: number;
  type: AssetId;
  style: number;
  height: number;
  updated: boolean;
  update: () => void;
};

const updateSpeed = 0.001;
// Define the buildingFactory object type
export type BuildingFactory = {
  grass: () => BuildingType;
  residential: () => BuildingType;
  commercial: () => BuildingType;
  industrial: () => BuildingType;
  road: () => BuildingType;
};

// Implement the buildingFactory
export const buildingFactory: BuildingFactory = {
  grass: () => ({
    uuid: crypto.randomUUID(),
    type: "grass",
    style: Math.floor(3 * Math.random()) + 1,
    height: 1,
    updated: false,
    update() {
      this.updated = false;
    },
    toHTML() {
      return ``;
    },
  }),
  residential: () => ({
    uuid: crypto.randomUUID(),
    residents: [],
    type: "residential",
    style: Math.floor(3 * Math.random()) + 1,
    height: 1,
    updated: false,
    maxResidents: 4,
    update() {
      if (Math.random() < updateSpeed) {
        if (this.height < 5) {
          this.height += 1;
          this.updated = true;
        }
      }
      if (
        Math.random() < 0.001 &&
        this.height >= 1 &&
        this.residents!.length < this.maxResidents!
      ) {
        const resident = createCitizen(this);
        this.residents?.push(resident);
      }
    },
  }),
  commercial: () => ({
    uuid: crypto.randomUUID(),
    type: "commercial",
    height: 1,
    style: Math.floor(3 * Math.random()) + 1,
    updated: false,
    update() {
      if (Math.random() < updateSpeed) {
        if (this.height < 5) {
          this.height += 1;
          this.updated = true;
        } else {
          this.updated = false;
        }
      }
    },
  }),
  industrial: () => ({
    uuid: crypto.randomUUID(),
    type: "industrial",
    height: 1,
    style: Math.floor(3 * Math.random()) + 1,
    updated: false,
    update() {
      if (Math.random() < updateSpeed) {
        if (this.height < 5) {
          this.height += 1;
          this.updated = true;
        }
      }
    },
  }),
  road: () => ({
    uuid: crypto.randomUUID(),
    type: "road",
    height: 0.1,
    style: Math.floor(3 * Math.random()) + 1,
    updated: false,
    update() {
      this.updated = false;
    },
  }),
};
