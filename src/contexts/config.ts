export default {
  simulation: {
    simulationSpeed: 0.01,
  },
  citizen: {
    minWorkingAge: 16,
    retirementAge: 65,
    maxJobSearchDistance: 4,
  },
  zone: {
    abandonmentThreshold: 10, //number of days before abandment
    abandonmentChance: 0.005, //prbability of building abandment
    developementChance: 0.005, //probability of building development
    maxRoadSearchDistance: 2, //max distance between building and road
    maxResident: 4, //max resident in the house
    residentMoveInChance: 0.005, //chance for resident to move in
  },
  selection: {
    selectEmissive: "0xFF0000",
    baseColor: "0xffffff",
    baseEmissive: "0x000000",
    abandonedColor: "0x555555",
  },
  time: {
    daysInSeconds: 0.1,
  },
};
