import { Citizen, createCitizen } from "./citizen";
import { City } from "./city";
import { AssetId } from "./city-context";
import config from "./config";

export type Building = {
  readonly x: number;
  readonly y: number;
  readonly name?: string;
  readonly uuid: string;
  readonly type: AssetId;
  readonly style: number;
  readonly maxResidents?: number;
  residents?: Citizen[];

  readonly workers?: Citizen[];
  readonly maxWorkers?: number;
  numberOfJobsAvailable?: () => number;
  numberOfJobsFilled?: () => number;
  dispose?: () => void;

  height: number;
  updated: boolean;

  update: () => void;
  checkRoadAccess?: (city: City) => void;
  hasRoadAccess?: boolean;
};

const updateSpeed = 0.001;
// Define the buildingFactory object type
export type BuildingFactory = {
  grass: (x: number, y: number) => Building;
  residential: (x: number, y: number) => Building;
  commercial: (x: number, y: number) => Building;
  industrial: (x: number, y: number) => Building;
  road: (x: number, y: number) => Building;
};

// Implement the buildingFactory
export const buildingFactory: BuildingFactory = {
  grass: (x: number, y: number) => ({
    x,
    y,
    uuid: crypto.randomUUID(),
    type: "grass",
    style: Math.floor(3 * Math.random()) + 1,
    height: 1,
    updated: false,
    update() {
      this.updated = false;
    },
  }),
  residential: (x: number, y: number) => ({
    x,
    y,
    uuid: crypto.randomUUID(),
    residents: [],
    type: "residential",
    style: Math.floor(3 * Math.random()) + 1,
    height: 1,
    updated: false,
    maxResidents: config.zone.maxResident,
    update() {
      if (Math.random() < updateSpeed) {
        if (this.height < 5) {
          this.height += 1;
          this.updated = true;
        }
      }
      if (
        Math.random() < config.zone.residentMoveInChance &&
        this.height >= 1 &&
        this.residents!.length < this.maxResidents!
      ) {
        const resident = createCitizen(this);
        this.residents?.push(resident);
      }
    },
    checkRoadAccess(city: City) {
      const road = city.findTile(
        x,
        y,
        (tile) => {
          return tile.building?.type === "road";
        },
        config.zone.maxRoadSearchDistance
      );

      if (road) {
        this.hasRoadAccess = true;
      } else {
        this.hasRoadAccess = false;
      }
    },
  }),
  commercial: (x: number, y: number) => ({
    x,
    y,
    name: getRandomCompanyName(),
    uuid: crypto.randomUUID(),
    type: "commercial",
    height: 1,
    style: Math.floor(3 * Math.random()) + 1,
    updated: false,
    maxWorkers: 4,
    workers: [],
    numberOfJobsAvailable() {
      return this.maxWorkers! - this.workers!.length;
    },
    numberOfJobsFilled() {
      return this.workers!.length;
    },
    update() {
      if (Math.random() < updateSpeed) {
        if (this.height < 5) {
          this.height += 1;
          this.updated = true;
        }
      }
    },
    dispose() {
      this.workers?.forEach((worker) => (worker.job = null));
    },
  }),
  industrial: (x: number, y: number) => ({
    x,
    y,
    name: getRandomCompanyName(),
    uuid: crypto.randomUUID(),
    type: "industrial",
    height: 1,
    style: Math.floor(3 * Math.random()) + 1,
    updated: false,
    maxWorkers: 4,
    workers: [],
    numberOfJobsAvailable() {
      return this.maxWorkers! - this.workers!.length;
    },
    numberOfJobsFilled() {
      return this.workers!.length;
    },
    update() {
      if (Math.random() < updateSpeed) {
        if (this.height < 5) {
          this.height += 1;
          this.updated = true;
        }
      }
    },
    dispose() {
      this.workers?.forEach((worker) => (worker.job = null));
    },
  }),
  road: (x: number, y: number) => ({
    x,
    y,
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

type CompanyNames = {
  [key: string]: string;
};

const companyNames: CompanyNames = {
  1: "Tech Innovators Inc.",
  2: "Global Dynamics Ltd.",
  3: "Green Solutions LLC",
  4: "Quantum Computing Corp.",
  5: "Pioneer Ventures",
  6: "NexGen Analytics",
  7: "Urban Builders Co.",
  8: "Eco World Industries",
  9: "Apex Technologies",
  10: "Bright Future Holdings",
  11: "Skyline Ventures",
  12: "OmniSource International",
  13: "Silver Peak Advisors",
  14: "Velocity Motors",
  15: "Northern Lights Trading",
};

const getRandomCompanyName = (): string => {
  const keys = Object.keys(companyNames);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return companyNames[randomKey];
};
