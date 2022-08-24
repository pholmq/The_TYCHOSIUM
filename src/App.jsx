//Test
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stats, OrbitControls, Stars } from "@react-three/drei";
import { Leva } from "leva";
import { useStore } from "./store";

import { Cobj } from "./Cobj";
import { Controls } from "./Controls";
import "./styles.css";

//rotation={[Math.PI / 2, 0, 0]}
//<axesHelper args={[2, 2, 2]} />
const System = () => {
  const posRef = useStore((s) => s.posRef);
  const run = useStore((s) => s.run);
  const speedFact = useStore((state) => state.speedFact);

  useFrame((state, delta) => {
    if (run) {
      // posRef.current = posRef.current + delta * 0.1;
      posRef.current = posRef.current + delta * speedFact;
    }
  });

  return (
    <group>
      <Cobj name="Barycenter">
        <Cobj name="Earth">
          <Cobj name="MoonDefA">
            <Cobj name="MoonDefB">
              <Cobj name="Moon" />
            </Cobj>
          </Cobj>
          <Cobj name="SunDefA">
            <Cobj name="Sun">
              <Cobj name="JupiterDef">
                <Cobj name="Jupiter" />
              </Cobj>
              <Cobj name="SaturnDef">
                <Cobj name="Saturn" />
              </Cobj>
            </Cobj>
          </Cobj>
          <Cobj name="VenusDefA">
            <Cobj name="VenusDefB">
              <Cobj name="Venus" />
            </Cobj>
          </Cobj>
          <Cobj name="MercuryDefA">
            <Cobj name="MercuryDefB">
              <Cobj name="Mercury" />
            </Cobj>
          </Cobj>
          <Cobj name="MarsDefE">
            <Cobj name="MarsDefS">
              <Cobj name="Mars" />
            </Cobj>
          </Cobj>
        </Cobj>
      </Cobj>
    </group>
  );
};

export default function App() {
  const ocRef = useRef(null);

  return (
    <>
      <div
        style={{
          width: 310,
          position: "absolute",
          right: 0,
          top: 350,
          zIndex: 100,
          opacity: 0.8
        }}
      >
        <Leva
          hideCopyButton
          fill
          collapsed
          titleBar={{ title: "Settings" }}
          theme={{
            colors: { highlight2: "#FFFFFF" },
            fontSizes: { root: "15px" }
          }}
        />
      </div>
      <Canvas
        // dpr={(Math.min(window.devicePixelRatio), 2)}
        camera={{
          fov: 15,
          position: [0, 3000, 0],
          near: 0.1,
          far: 10000000
        }}
      >
        {/* <OrbitControls makeDefault target={[0, 0.5, 0]} /> */}
        <OrbitControls makeDefault enableDamping={false} maxDistance={500000} />
        {/* <axesHelper args={[10, 10, 10]} position={[0, 0, 0]} /> */}
        {/* <directionalLight intensity={1} /> */}
        <ambientLight intensity={0.5} />
        <Stars radius={100000} />
        <Suspense fallback={null}>
          <System />
        </Suspense>
        <Stats />
      </Canvas>
      <Controls />
    </>
  );
}
