import { useRef, useEffect } from "react";
import { useControls } from "leva";
import { CameraHelper, Vector3, Quaternion, Euler } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Box, useHelper } from "@react-three/drei";

import CompassText from "./CompassText";

export default function PlanetCamera() {
  const planetCam = useRef();

  const toggleCam = useControls("Planet Camera", {
    on: false
  });

  const [showH, setHelper] = useControls("Planet Camera", () => ({
    showHelper: false
  }));

  const camProps = useControls("Planet Camera", {
    fov: { value: 25, max: 100, min: 10 },
    far: { value: 500, max: 1000, min: 1 },
    near: { value: 0, max: 0.5, min: 0.000000001, step: 0.0001 }
  });

  // const camPos = useControls("Planet Camera", {
  //   Direction: { value: 0, max: Math.PI * 2, min: 0 },
  //   Up: { value: 0, max: Math.PI / 2, min: -Math.PI/2 },
  //   Height: { value: 0.51, max: 2, min: 0.51, step: 0.0001 },
  //   Latitude: { value: 0, max: Math.PI, min: -Math.PI, step: 0.001 },
  //   Longitude: { value: 0, max: Math.PI * 2, min: 0, step: 0.001 }
  // });

  const camPos = useControls("Planet Camera", {
    Direction: { value: 0, max: Math.PI * 2, min: 0 },
    Up: { value: 0, max: Math.PI / 2, min: -Math.PI / 2 },
    Height: { value: 0.51, max: 2, min: 0, step: 0.0001 },
    Latitude: { value: 0, max: Math.PI, min: -Math.PI, step: 0.001 },
    Longitude: { value: 0, max: Math.PI * 2, min: 0, step: 0.001 }
  });

  // const [{camPos.Direction}, set] = useControls(() => ({ text: 'my string' }))

  useHelper(showH.showHelper && planetCam, CameraHelper, 1);

  //Drag camera. Code inspired by https://github.com/mrdoob/three.js/blob/master/examples/js/controls/PointerLockControls.js
  const _euler = new Euler(0, 0, 0, "YXZ");
  const _vector = new Vector3();
  const pointerSpeed = 0.5;
  const minPolarAngle = 0; // radians
  const maxPolarAngle = Math.PI; // radians
  const _PI_2 = Math.PI / 2;

  function mouseMove(event) {
    if (!toggleCam.on) return;
    if (event.buttons !== 1) return;
    //Planet Camera is selected and left mouse button is pressed (mouse drag)
    // console.log(event)
    const movementX =
      event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    const movementY =
      event.movementY || event.mozMovementY || event.webkitMovementY || 0;
    _euler.setFromQuaternion(planetCam.current.quaternion);

    _euler.y += movementX * 0.002 * pointerSpeed;
    _euler.x += movementY * 0.002 * pointerSpeed;
    _euler.x = Math.max(
      _PI_2 - maxPolarAngle,
      Math.min(_PI_2 - minPolarAngle, _euler.x)
    );
    planetCam.current.quaternion.setFromEuler(_euler);
  }

  function zoom(event) {
    // console.log(toggleCam)
    if (!toggleCam.on) return;
    // console.log(event.deltaY);
    if (event.deltaY > 0) {
      planetCam.current.fov += 1;
    } else {
      planetCam.current.fov -= 1;
    }
    planetCam.current.updateProjectionMatrix();
    // camera.updateProjectionMatrix();
  }

  const { camera } = useThree();

  const controls = useThree((state) => state.controls);
  // console.log(controls)
  const spaceCamPos = new Vector3();
  const spaceCamRotation = new Quaternion();

  useEffect(() => {
    // console.log(showH)
    if (!toggleCam.on && controls) {
      // console.log(spaceCamPos)
      camera.position.copy(spaceCamPos); //Is null. useState case
      camera.rotation.setFromQuaternion(spaceCamRotation);
      controls.enabled = true;
      camera.updateProjectionMatrix();
    }
    if (toggleCam.on) {
      // console.log('fire')
      camera.getWorldPosition(spaceCamPos);
      camera.getWorldQuaternion(spaceCamRotation);
    }

    // console.log(planetCam) //planetCam is initialized when run in use effect
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("wheel", zoom);

    // cleanup this component
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("wheel", zoom);
    };
  }, [toggleCam]);

  const vector = new Vector3();
  const quaternion = new Quaternion();
  const slerpQuaternion = new Quaternion();

  useFrame(() => {
    if (!toggleCam.on) return;
    controls.enabled = false;

    planetCam.current.getWorldPosition(vector);
    planetCam.current.getWorldQuaternion(quaternion);
    camera.getWorldQuaternion(slerpQuaternion);

    if (camera.position.distanceTo(vector) > 0.4) {
      //lerp & slerp cam towards planet
      camera.position.lerp(vector, 0.03);
      slerpQuaternion.slerp(quaternion, 0.003);
      camera.rotation.setFromQuaternion(slerpQuaternion);
      return;
    }
    setHelper({ showHelper: false });
    // toggleCam.showHelper = false;

    camera.position.copy(vector);
    camera.rotation.setFromQuaternion(quaternion);
    camera.fov = planetCam.current.fov;
    camera.far = planetCam.current.far;
    camera.near = planetCam.current.near;

    camera.updateProjectionMatrix();
  });

  return (
    <group rotation={[0, camPos.Longitude, 0]}>
      {/* <Sphere args={[0.1, 8, 8]}/> */}
      <group rotation={[camPos.Latitude, 0, 0]}>
        {/* <Cylinder position={[0, 0.5, 0]} args={[0.01, 0.01, 1]} /> */}
        <group position={[0, 0.5, 0]}>
          <CompassText />

          {/* Note: It's crucial to set rotation-order = {"YXZ"} otherwise the camera will look up/down incorrectly */}
          <group position={[0, camPos.Height, 0]}>
            <Box args={[0.02, 0.01, 0.02]} position={[0, 0, 0]}>
              <meshPhongMaterial color="#ff0000" />
            </Box>
            <PerspectiveCamera
              ref={planetCam}
              {...camProps}
              position={[0, 0, 0]}
              rotation-order={"YXZ"}
              rotation={[camPos.Up, camPos.Direction, 0]}
            ></PerspectiveCamera>
          </group>
        </group>
      </group>
    </group>
  );
}
