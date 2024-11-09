import { Camera, Mesh, Object3D, Raycaster, Vector2 } from "three";

export const getSelectedObject = (
  raycaster: Raycaster,
  objects: Object3D[],
  e: MouseEvent,
  camera: Camera,
  canvasWidth: number,
  canvasHeight: number
): Mesh | null => {
  e.stopPropagation();
  const mouse = new Vector2();
  mouse.x = (e.clientX / canvasWidth) * 2 - 1;
  mouse.y = -(e.clientY / canvasHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersections = raycaster.intersectObjects(objects, false);

  if (intersections.length > 0) return intersections[0].object as Mesh;

  return null;
};
