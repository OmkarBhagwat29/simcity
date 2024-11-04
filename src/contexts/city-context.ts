import { createContext, useContext } from "react";

interface CityContextProps {
  data: number[][];
  addData: (x: number, y: number) => void;
}

export const CityContext = createContext<CityContextProps>({
  data: [],
  addData: (x: number, y: number) => {},
});

export const useCity = () => {
  return useContext(CityContext);
};

export const CityProvider = CityContext.Provider;
