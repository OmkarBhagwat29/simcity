export type BuildingType = {
  type: string;
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
    type: "grass",
    style: Math.floor(3 * Math.random()) + 1,
    height: 1,
    updated: false,
    update() {
      this.updated = false;
    },
  }),
  residential: () => ({
    type: "residential",
    style: Math.floor(3 * Math.random()) + 1,
    height: 1,
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
  commercial: () => ({
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
    type: "road",
    height: 0.1,
    style: Math.floor(3 * Math.random()) + 1,
    updated: false,
    update() {
      this.updated = false;
    },
  }),
};
