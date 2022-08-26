import { useStore } from "./store.js";
export function CelestialSphere({ tilt, tiltb, visible }) {
  console.log("cel sphere " + tilt + " " + tiltb);
  return (
    <mesh
      name="CelestialSphere"
      visible={visible}
      rotation={[tiltb * (Math.PI / 180), 0, tilt * (Math.PI / 180)]}
    >
      <sphereGeometry args={[10, 64, 64]} />
      <meshBasicMaterial color="white" opacity={0.5} transparent />
      <axesHelper args={[20, 20, 20]} />
    </mesh>
  );
}
