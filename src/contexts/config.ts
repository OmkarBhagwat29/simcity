export default {
  citizen: {
    minWorkingAge: 16,
    retirementAge: 65,
    maxJobSearchDistance: 4,
  },
  zone: {
    abandonmentThreshold: 10, //number of days before abandment
    abandonmentChance: 0.25, //prbability of building abandment
    developementChance: 0.25, //probability of building development
    maxRoadSearchDistance: 3, //max distance between building and road
    maxResident: 4, //max resident in the house
    residentMoveInChance: 0.5, //chance for resident to move in
  },
};
