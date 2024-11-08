export type BuildingType = {
  id: string;
  height: number;
  updated: boolean;
  update: () => void;
};

const updateSpeed = 0.0001;
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
    id: "grass",
    height: 1,
    updated: false,
    update() {
      this.updated = false;
    },
  }),
  residential: () => ({
    id: "residential",
    height: 0.1,
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
    id: "commercial",
    height: 0.1,
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
  industrial: () => ({
    id: "industrial",
    height: 0.1,
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
    id: "road",
    height: 0.1,
    updated: false,
    update() {
      this.updated = false;
    },
  }),
};
