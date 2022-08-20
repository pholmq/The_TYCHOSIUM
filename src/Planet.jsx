import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sphere, useTexture, Html, Billboard } from "@react-three/drei";
import { LayerMaterial, Depth } from "lamina";
import * as THREE from "three";

import PlanetCamera from "./PlanetCamera";

// import PlanetCamera from "./PlanetCamera";

const Glow = ({ color, scale = 0.5, near = -2, far = 1.4 }) => (
  <Billboard>
    <mesh>
      <sphereGeometry args={[scale, 32, 32]} />
      <LayerMaterial
        transparent
        depthWrite={false}
        blending={THREE.CustomBlending}
        blendEquation={THREE.AddEquation}
        blendSrc={THREE.SrcAlphaFactor}
        blendDst={THREE.DstAlphaFactor}
      >
        <Depth
          colorA={color}
          colorB="black"
          alpha={1}
          mode="normal"
          near={near * scale}
          far={far * scale}
          origin={[0, 0, 0]}
        />
        <Depth
          colorA={color}
          colorB="black"
          alpha={0.5}
          mode="add"
          near={-40 * scale}
          far={far * 1.2 * scale}
          origin={[0, 0, 0]}
        />
        <Depth
          colorA={color}
          colorB="black"
          alpha={1}
          mode="add"
          near={-15 * scale}
          far={far * 0.7 * scale}
          origin={[0, 0, 0]}
        />
        <Depth
          colorA={color}
          colorB="black"
          alpha={1}
          mode="add"
          near={-10 * scale}
          far={far * 0.68 * scale}
          origin={[0, 0, 0]}
        />
      </LayerMaterial>
    </mesh>
  </Billboard>
);

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
          <Html position={[0, 0, 0]}>
            <div className="planetLabel">
              {props.name} <br /> RA:&nbsp;XXhXXmXXs Dec:&nbsp;+XX°XX'XX"
            </div>
          </Html>
        )}

        <sphereGeometry args={[props.size, 128, 128]} />
        {/* <meshPhongMaterial specularMap={specularMap} /> */}
        <meshStandardMaterial
          map={planetTexture}
          // normalMap={normalMap}
          // metalness={0.4}
          // roughness={0.7}
          // side={DoubleSide}
        />
        {/* <PlanetCamera /> */}
        {props.light && <pointLight intensity={3} />}
        {/* {props.glow && <Glow scale={props.size * 1} color="lightyellow" />} */}
      </mesh>
    </>
  );
}
