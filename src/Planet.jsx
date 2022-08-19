import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sphere, useTexture } from "@react-three/drei";
import PlanetCamera from "./PlanetCamera";

// import PlanetCamera from "./PlanetCamera";

export function Planet(props) {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.y -= 0.0005;
  });
  // ref.current.scale.set(3,3,3)
  // const [earthColor, ocean] = useTexture([
  //   '/textures/earth-color.jpg',
  //   '/textures/earth-ocean.jpg',
  // ])
  const [earthday] = useTexture([
    // map: "/world_topo_bathy_200407_3x5400x2700.jpg"
    "/textures/8k_earth_daymap.jpg"
  ]);

  // const controls = useThree((state) => state.controls);
  // console.log(controls);

  return (
    <>
      <Sphere
        args={[props.size, 128, 128]}
        scale={1}
        ref={ref}
        // rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshPhongMaterial map={earthday} />
        <PlanetCamera />
      </Sphere>
    </>
  );
}
