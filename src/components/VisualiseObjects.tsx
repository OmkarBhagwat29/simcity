import React, { useState } from "react";
import { useCity } from "../contexts/city-context";
import { Mesh } from "three";
import { setEmissive } from "../helpers/material-helper";

let selectedObject: Mesh | null = null;
let hoverObject: Mesh | null = null;
const VisualiseObjects = () => {
  const { tiles, buildingObjects, infoDiv, commandId } = useCity();

  const handleMouseDown = (e) => {
    e.stopPropagation();

    if (e.button !== 0) {
      return;
    }

    if (selectedObject) {
      setEmissive(selectedObject, "0x000000");
    }

    const obj = e.object as Mesh;

    setEmissive(obj, "0x888888");

    if (commandId === "select" && infoDiv) {
      //get tile
      const tile = tiles.filter(
        (tile, index) => index === obj.userData.tileIndex
      )[0];

      infoDiv.innerHTML = JSON.stringify(tile.Object.userData, null, 2); // formatted JSON
    } else {
      infoDiv!.innerHTML = "";
    }

    selectedObject = obj;
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();

    const obj = e.object as Mesh;

    setEmissive(obj, "0x888888");

    hoverObject = obj;
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();

    if (hoverObject && hoverObject.uuid !== selectedObject?.uuid) {
      setEmissive(hoverObject, "0x000000");

      hoverObject = null;
    }
  };

  return (
    <>
      {tiles &&
        tiles.map((tile) => (
          <primitive
            onPointerDown={handleMouseDown}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            key={tile.Object.uuid}
            object={tile.Object}
          />
        ))}

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
