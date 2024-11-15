import { useCity } from "../contexts/city-context";
import { Mesh } from "three";
import { setEmissive } from "../helpers/material-helper";
import { useEffect, useMemo } from "react";
import config from "../contexts/config";
import { getLastParentOfObject } from "../helpers/game-helper";

type Selection = {
  selectedObject: Mesh | null;
  hoverObject: Mesh | null;
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

    const obj = e.object as Mesh;
    if (selection.selectedObject) {
      setEmissive(selection.selectedObject, config.selection.baseEmissive);
    }

    //select
    setEmissive(obj, config.selection.selectEmissive);

    if (commandId === "select") {
      const mainObj = getLastParentOfObject(e.object);
      setSelectedObject(mainObj);
    }

    selection.selectedObject = obj;
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();

    const obj = e.object as Mesh;
    //  / console.log(obj);
    //hover
    setEmissive(obj, config.selection.selectEmissive);

    selection.hoverObject = obj;
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();

    if (
      selection.hoverObject &&
      selection.hoverObject.uuid !== selection.selectedObject?.uuid
    ) {
      setEmissive(selection.hoverObject, config.selection.baseEmissive);

      selection.hoverObject = null;
    }
  };

  useEffect(() => {
    console.log("building object changed");
  }, [buildingObjects]);

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
          />
        ))}
    </>
  );
};

export default VisualiseObjects;
