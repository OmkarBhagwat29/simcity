import { Camera, Mesh, Object3D, Raycaster, Vector2 } from "three";
import { getLastParentOfObject } from "./game-helper";

export const getSelectedObject = (
  raycaster: Raycaster,
  objects: Object3D[],
  e: MouseEvent,
  camera: Camera,
  canvasWidth: number,
  canvasHeight: number
): Object3D | null => {
  e.stopPropagation();
  const mouse = new Vector2();
  mouse.x = (e.clientX / canvasWidth) * 2 - 1;
  mouse.y = -(e.clientY / canvasHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const allObjects: Object3D[] = [];
  objects.forEach((obj) => {
    if (obj instanceof Object3D) {
      allObjects.push(obj);
      obj.traverse((child) => {
        if (child instanceof Mesh) allObjects.push(child);
      });
    }
  });

  const intersections = raycaster.intersectObjects(allObjects, false);

  if (intersections.length > 0) {
    const obj = intersections[0].object as Object3D;

    const mainObj = getLastParentOfObject(obj);

    return mainObj;
  }

  return null;
};
