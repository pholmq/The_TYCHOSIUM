import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sphere, useTexture } from "@react-three/drei";
import PlanetCamera from "./PlanetCamera";
import { DoubleSide } from "three";

// import PlanetCamera from "./PlanetCamera";

export function Earth(props) {
  const earthRef = useRef();
  const cloudsRef = useRef();
  const ref = useRef();
  useFrame(() => {
    // ref.current.rotation.y -= 0.0005;
    earthRef.current.rotation.y -= 0.0005;
    cloudsRef.current.rotation.y -= 0.0004;
  });
  const [cloudsMap, colorMap] = useTexture([
    "/textures/8k_earth_clouds.jpg",
    "/textures/8k_earth_daymap.jpg"
    // "/textures/8k_earth_normal_map.jpg",
    // "/textures/8k_earth_specular_map.jpg"
  ]);

  return (
    <>
      <mesh ref={earthRef} scale="1">
        <sphereGeometry args={[props.size, 128, 128]} />
        {/* <meshPhongMaterial specularMap={specularMap} /> */}
        <meshStandardMaterial
          map={colorMap}
          // normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
          // side={DoubleSide}
        />
        <PlanetCamera />
      </mesh>

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
