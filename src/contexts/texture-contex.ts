import { createContext, useContext } from "react";
import { Texture } from "three";

interface TextureContextProps {
  residential: Texture[];
  commercial: Texture[];
  industrial: Texture[];
  //   topMaterial: MeshLambertMaterial | null;
  //   sideMaterial: MeshLambertMaterial | null;
}

const TextureContext = createContext<TextureContextProps>({
  residential: [],
  commercial: [],
  industrial: [],
  //   topMaterial: null,
  //   sideMaterial: null,
});

export const useCityTextures = () => {
  return useContext(TextureContext);
};

export const TextureProvider = TextureContext.Provider;
