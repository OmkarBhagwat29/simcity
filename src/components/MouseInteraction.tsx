import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { useCity } from "../contexts/city-context";
import { Mesh } from "three";
import { setEmissive } from "../helpers/material-helper";

const MouseInteraction = () => {
  const { raycaster } = useThree();
  const { tiles, buildingObjects, commandId } = useCity();

  const objs = [...buildingObjects, ...tiles.map((tile) => tile.Object)];
  let selectedHoverObject: Mesh | null = null;
  let selectedClickedObject: Mesh | null = null;

  const onMouseMove = () => {
    const intersections = raycaster.intersectObjects(objs, false);

    if (selectedHoverObject) {
      setEmissive(selectedHoverObject, "0");
    }

    if (intersections.length > 0) {
      selectedHoverObject = intersections[0].object as Mesh;

      setEmissive(selectedHoverObject, "0x888888");
    }
  };

  const onMouseDown = () => {
    if (commandId !== "select") return;

    const intersections = raycaster.intersectObjects(objs, false);

    if (selectedClickedObject) {
      setEmissive(selectedClickedObject, "0");
    }

    if (intersections.length > 0) {
      selectedClickedObject = intersections[0].object as Mesh;

      setEmissive(selectedClickedObject, "0x888888");
    }
  };

  //hover
  window.addEventListener("mousemove", onMouseMove);

  //add
  window.addEventListener("mousedown", onMouseDown);

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  return <></>;
};

export default MouseInteraction;
