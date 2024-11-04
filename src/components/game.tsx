import React, { useState } from "react";
import Scene from "./scene";

import City from "./city";
import { CityProvider } from "../contexts/city-context";

const Game = () => {
  const [cityData, setCityData] = useState<number[][]>([]);

  const addCityData = (x: number, y: number) => {};

  return (
    <>
      <Scene />
      <CityProvider value={{ data: cityData, addData: addCityData }}>
        <City />
      </CityProvider>
    </>
  );
};

export default Game;
