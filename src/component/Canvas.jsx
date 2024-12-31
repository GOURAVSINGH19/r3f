import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { Canvas, useThree, useFrame, useStore } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

const Cnva = () => {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 8], fov: 80 }}
      className="absolute top-0 z-[2] pointer-events-none"
      gl={{ alpha: true }}
    >
      <Sky />
      {/* <OrbitControls/> */}
      <ambientLight intensity={0.4} />
      <Environment preset="sunset" />
      <fog attach="fog" args={["#d0d0d0", 0.1, 10]} />

    </Canvas>
  );
};

const Rig = () => {
  const { camera, pointer } = useThree();
  const vec = new THREE.Vector3();

  let tl = gsap.timeline();
  useEffect(() => {
    tl.fromTo(
      camera.position,
      {
        x: -25,
        y: 0,
        z: -25,
        duration: 0.5,
        ease: "power1.inOut",
        onUpdate: function () {
          camera.lookAt(new THREE.Vector3(0, 0, 0));
        },
      },
      {
        x: 0,
        y: 0,
        z: 0,
        duration: 5,
        ease: "power1.inOut",
      }
    );
  }, [camera]);

  return useFrame(() => {
    camera.position.lerp(
      vec.set(pointer.x, pointer.y / 2, camera.position.z),
      0.05
    );
    camera.lookAt(0, 0, 0);
  });
};

function Intro() {
  const vec = new THREE.Vector3();
  const clicked = useStore((state) => state.clicked);

  return useFrame((state) => {
    if (clicked) {
      state.camera.position.lerp(vec.set(-2 + state.mouse.x, 2, 4.5), 0.05);
      state.camera.lookAt(0, 0, 0);
    }
  });
}

export default Cnva;
