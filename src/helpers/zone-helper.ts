import { Clock, Mesh } from "three";
import { City } from "../contexts/city";
import { Building } from "../contexts/buildings";
import config from "../contexts/config";
import { setBaseColor } from "./material-helper";

const setRoadAccess = (building: Building, city: City) => {
  const road = city.findTile(
    building.x,
    building.y,
    (tile) => {
      const building = city.buildings[tile.x][tile.y];
      if (!building) return false;

      return building.type === "road";
    },
    config.zone.maxRoadSearchDistance
  );

  if (road) {
    building.hasRoadAccess = true;
  } else {
    building.hasRoadAccess = false;
  }
};

export const simulateAdandomentAndRenovate = (
  building: Building,
  city: City,
  clock: Clock,
  object: Mesh
) => {
  setRoadAccess(building, city);
  if (!building.hasRoadAccess && !building.abandoned) {
    if (building.height > 1) {
      if (Math.random() > config.zone.abandonmentChance) {
        building.goingTobeAbandoned = true;
      }
    }

    if (building.goingTobeAbandoned) {
      building.abandonedTime! += clock.getDelta() * clock.getElapsedTime();

      if (building.abandonedTime! > config.time.daysInSeconds) {
        building.abandonDays! += 1;

        if (building.abandonDays! >= config.zone.abandonmentThreshold) {
          building.abandoned = true;
          building.residents = [];
          building.goingTobeAbandoned = false;
          building.canRedeveloped = false;
          console.log("building is abandoned ->", building.uuid);

          setBaseColor(object, config.selection.abandonedColor);
        }

        building.abandonedTime = 0;
      }
    }
  } else if (building.hasRoadAccess && building.abandoned) {
    //does buildign have a chance to redeveloped

    if (Math.random() > config.zone.developementChance) {
      building.canRedeveloped = true;
    }
    if (building.canRedeveloped) {
      building.abandonedTime! += clock.getDelta() * clock.getElapsedTime();
      if (
        building.abandonedTime! > config.time.daysInSeconds &&
        building.abandonDays! > 0
      ) {
        building.abandonDays! -= 1;

        if (building.abandonDays === 0) {
          building.abandoned = false;
          building.residents = [];
          console.log("building is redeveloped ->", building.uuid);
          setBaseColor(object, config.selection.baseColor);
        }

        building.abandonedTime = 0;
      }
    }
  }
};
