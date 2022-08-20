import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sphere, useTexture } from "@react-three/drei";
import PlanetCamera from "./PlanetCamera";
import { DoubleSide } from "three";
import { useStore } from "./store.js";

// import PlanetCamera from "./PlanetCamera";

export function Earth(props) {
  // console.log(props)

  const earthRef = useRef();
  const cloudsRef = useRef();
  const posRef = useStore((state) => state.posRef);
  useFrame(() => {
    // earthRef.current.rotation.y -= 0.0005;
    // obj.planetObj.rotation.y = obj.rotationSpeed * pos
    earthRef.current.rotation.y = props.rotationSpeed * posRef.current;
    cloudsRef.current.rotation.y -= 0.0004;
  });

  const [cloudsMap, colorMap] = useTexture([
    "/textures/2k_earth_clouds.jpg",
    "/textures/8k_earth_daymap.jpg"
  ]);

  return (
    <>
      <mesh
        ref={earthRef}
        scale="1"
        rotation={[
          props.tiltb * (Math.PI / 180),
          0,
          props.tilt * (Math.PI / 180)
        ]}
      >
        <sphereGeometry args={[props.size, 128, 128]} />
        {/* <meshPhongMaterial specularMap={specularMap} /> */}
        <meshStandardMaterial
          map={colorMap}
          // normalMap={normalMap}
          metalness={0}
          roughness={1}
          // side={DoubleSide}
        />
        <mesh ref={cloudsRef} scale="1">
          <sphereGeometry args={[props.size + 0.03, 64, 64]} />
          <meshPhongMaterial
            map={cloudsMap}
            opacity={0.2}
            depthWrite={true}
            transparent={true}
            // side={DoubleSide}
          />
        </mesh>
        <PlanetCamera />
      </mesh>

      {/* <Sphere
        args={[props.size, 128, 128]}
        scale={1}
        ref={ref}
        // rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshPhongMaterial map={colorMap} />
      </Sphere> */}
    </>
  );
}
