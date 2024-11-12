import { useCity } from "../contexts/city-context";
import { Mesh } from "three";
import { setEmissive } from "../helpers/material-helper";
import { useMemo } from "react";

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

    if (selection.selectedObject) {
      setEmissive(selection.selectedObject, "0x000000");
    }

    const obj = e.object as Mesh;

    setEmissive(obj, "0x888888");

    if (commandId === "select") {
      //get tile
      setSelectedObject(e.object);
    }

    selection.selectedObject = obj;
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();

    const obj = e.object as Mesh;

    setEmissive(obj, "0x888888");

    selection.hoverObject = obj;
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();

    if (
      selection.hoverObject &&
      selection.hoverObject.uuid !== selection.selectedObject?.uuid
    ) {
      setEmissive(selection.hoverObject, "0x000000");

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
          />
        ))}
    </>
  );
};

export default VisualiseObjects;
