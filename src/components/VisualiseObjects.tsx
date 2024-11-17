import { useCity } from "../contexts/city-context";
import { Mesh, Object3D } from "three";
import { setEmissive, setObjectEmissive } from "../helpers/material-helper";
import { useMemo } from "react";
import config from "../contexts/config";
import { getLastParentOfObject } from "../helpers/game-helper";

type Selection = {
  selectedObject: Object3D | null;
  hoverObject: Object3D | null;
};

const VisualiseObjects = () => {
  const { buildingObjects, commandId, setSelectedObject } = useCity();
  const selection: Selection = useMemo(() => {
    return { selectedObject: null, hoverObject: null };
  }, []);

  const handleMouseDown = (e) => {
    e.stopPropagation();

    if (e.button !== 0) {
      return;
    }

    if (selection.selectedObject) {
      setObjectEmissive(
        selection.selectedObject,
        config.selection.baseEmissive
      );
    }

    //select
    setObjectEmissive(e.object, config.selection.selectEmissive);

    if (commandId === "select") {
      const mainObj = getLastParentOfObject(e.object);
      setSelectedObject(mainObj);
    }

    selection.selectedObject = e.object;
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();

    const mainObj = getLastParentOfObject(e.object);

    setObjectEmissive(mainObj, config.selection.selectEmissive);

    selection.hoverObject = mainObj;
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();

    if (
      selection.hoverObject &&
      selection.hoverObject.uuid !== selection.selectedObject?.uuid
    ) {
      setObjectEmissive(selection.hoverObject, config.selection.baseEmissive);

      selection.hoverObject = null;
    }
  };

  return (
    <>
      {buildingObjects &&
        buildingObjects.map((obj) => (
          <primitive
            onPointerDown={handleMouseDown}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            key={obj.uuid}
            object={obj}
            onUnmount={() => {
              // Dispose geometry
              if (obj.geometry) {
                obj.geometry.dispose();
              }
              // Dispose materials
              if (obj.material) {
                if (Array.isArray(obj.material)) {
                  obj.material.forEach((material) => material.dispose());
                } else {
                  obj.material.dispose();
                }
              }
            }}
          />
        ))}
    </>
  );
};

export default VisualiseObjects;
