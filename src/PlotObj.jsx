//Object used to plot positions of planets

import { useRef, useEffect } from "react";
import { Sphere } from "@react-three/drei";
import { celestialSettings } from "./CelestialSettings.js";
import { additionalSettings } from "./AdditionalSettings.js";
import { useStore } from "./store.js";

export function PlotObj({ name, children }) {
  //Get the settings for this object and merge
  const { [name]: cSettings } = celestialSettings;
  const { [name]: aSettings } = additionalSettings;
  const s = { ...cSettings, ...aSettings };

  const orbitRef = useRef();

  const containerPos = s.containerPos ? s.containerPos : 0;
  // let pos = 0;
  //  const pos = useStore((state) => state.pos);
  const plotPos = useStore((state) => state.plotPos);
  useEffect(() => {
    orbitRef.current.rotation.y =
      s.speed * plotPos - s.startPos * (Math.PI / 180);
  });
  //console.log(plotPos);
  //   s.speed * plotPos - s.startPos * (Math.PI / 180);

  return (
    <group
      name="Container"
      position={[s.orbitCentera, s.orbitCenterc, s.orbitCenterb]}
      rotation={[
        s.orbitTilta * (Math.PI / 180),
        -containerPos * (Math.PI / 180),
        s.orbitTiltb * (Math.PI / 180)
      ]}
    >
      <group name="Orbit" ref={orbitRef}>
        <group name="Pivot" position={[s.orbitRadius, 0, 0]}>
          <Sphere args={[5, 30, 30]} visible={s.visible}>
            <meshBasicMaterial
              attach="material"
              color="white"
              opacity={0.5}
              transparent
            />
          </Sphere>
          {children}
        </group>
      </group>
    </group>
  );
}
