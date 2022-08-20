import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sphere, useTexture, Html } from "@react-three/drei";

import PlanetCamera from "./PlanetCamera";

// import PlanetCamera from "./PlanetCamera";

export function Planet(props) {
  const ref = useRef();
  // useFrame(() => {
  //   ref.current.rotation.y -= 0.0005;
  // });
  // const texture = props.texture;
  // const [cloudsMap, colorMap] = useTexture([
  const [planetTexture] = useTexture([props.texture]);
  // console.log(props);

  const [hovered, setHover] = useState(false);

  return (
    <>
      <mesh
        ref={ref}
        scale="1"
        // { e.stopPropagation(); handleT(); }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHover(false);
        }}
      >
        {hovered && (
          <Html position={[-10, 0, 0]}>
            <div className="planetLabel">
              {props.name} <br /> RA: XXhXXmXXs <br /> Dec: +XX°XX'XX"
            </div>
          </Html>
        )}

        <sphereGeometry args={[props.size, 128, 128]} />
        {/* <meshPhongMaterial specularMap={specularMap} /> */}
        <meshStandardMaterial
          map={planetTexture}
          // normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
          // side={DoubleSide}
        />
        {/* <PlanetCamera /> */}
        {props.light && <pointLight intensity={1} />}
      </mesh>
    </>
  );
}
