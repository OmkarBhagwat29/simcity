export type modelName = "construction-small" | "another-model"; // Add
type ModelPaths = Record<modelName, string>;

// Create and export the model paths object
export const modelPaths: ModelPaths = {
  "construction-small": "./models/construction-small.glb",
  "another-model": "./models/another-model.glb",
};
