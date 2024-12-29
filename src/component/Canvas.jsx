import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Cloud, Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import AnimatedPlanes from "./AnimatedPlanes";
import gsap from "gsap";
import { Suspense, useEffect } from "react";
import Experience from "./Experience";

const Cnva = () => {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 8], fov: 45 }}
      className=" absolute top-0 z-[4] pointer-events-none cursor-pointer bg-[#EEEEEE]"
      onScroll={() => {
        resize = false;
      }}
      gl={{ alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <Environment preset="sunset" />
      <fog attach="fog" args={["#d0d0d0", 0.1, 10]} />
      <Rig />
      {/* <Intro/> */}
      <Suspense fallback={null}>
        <Experience />
      </Suspense>
    </Canvas>
  );
};

const Rig = () => {
  const { camera, pointer } = useThree();
  const vec = new THREE.Vector3();

  return useFrame(() => {
    camera.position.lerp(
      vec.set(pointer.x, pointer.y / 2, camera.position.z),
      0.05
    );
    camera.lookAt(0, 0, 0);
  });
};

function Intro() {
  const clicked = useStore((state) => state.clicked);
  const api = useStore((state) => state.api);
  useEffect(() => api.loaded(), []);
  // Zoom in camera when user has pressed start
  return useFrame((state) => {
    if (clicked) {
      state.camera.position.lerp(vec.set(-2 + state.mouse.x, 2, 4.5), 0.05);
      state.camera.lookAt(0, 0, 0);
    }
  });
}

export default Cnva;
