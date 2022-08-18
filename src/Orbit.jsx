import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useStore } from "./store.js";
import { Line } from "@react-three/drei";

function Arrow({ rotation, radius, color, reverse = false }) {
  let arrowDirection = 0;
  if (reverse) {
    arrowDirection = Math.PI;
  }
  return (
    <group rotation={[0, 0, rotation]}>
      <mesh position={[radius, 0, 0]} rotation={[0, 0, arrowDirection]}>
        <coneGeometry args={[3, 8]} />
        <meshBasicMaterial color={color} opacity={0.5} transparent />
      </mesh>
    </group>
  );
}

export function Orbit({
  radius,
  color,
  lineWidth = 1,
  arrows = false,
  reverse = false,
  rotation = 0
}) {
  const orbitRef = useRef();
  const posRef = useStore((state) => state.posRef);

  useFrame(() => {
    if (showOrbits) {
      // const pos = useStore.getState().pos;
      orbitRef.current.rotation.z = rotation * posRef.current;
    }
  });

  let points = [];
  let arrowPoints = [];
  let arrowStepSize = 45;

  // // 360 full circle will be drawn clockwise
  for (let i = 0; i <= 360; i++) {
    points.push([
      Math.sin(i * (Math.PI / 180)) * radius,
      Math.cos(i * (Math.PI / 180)) * radius,
      0
    ]);
    if (i === arrowStepSize) {
      arrowPoints.push([
        Math.sin(i * (Math.PI / 180)) * radius,
        Math.cos(i * (Math.PI / 180)) * radius,
        0
      ]);
      arrowStepSize += arrowStepSize;
    }
  }
  const showArrows = useStore((s) => s.arrows);
  const showOrbits = useStore((s) => s.orbits);
  // console.log(showOrbits);

  return (
    <>
      {/* {showOrbits && ( */}
      <group ref={orbitRef} visible={showOrbits}>
        <group visible={arrows && showArrows}>
          <Arrow
            rotation={Math.PI / 4}
            radius={radius}
            color={color}
            reverse={reverse}
          />
          <Arrow
            rotation={(Math.PI / 4) * 3}
            radius={radius}
            color={color}
            reverse={reverse}
          />
          <Arrow
            rotation={(Math.PI / 4) * 5}
            radius={radius}
            color={color}
            reverse={reverse}
          />
          <Arrow
            rotation={(Math.PI / 4) * 7}
            radius={radius}
            color={color}
            reverse={reverse}
          />
        </group>

        <Line
          points={points} // Array of points
          color={color} // Default
          lineWidth={lineWidth} // In pixels (default)
          dashed={false}
          transparent
          opacity={0.5}
        />
      </group>
      {/* )} */}
    </>
  );
}
