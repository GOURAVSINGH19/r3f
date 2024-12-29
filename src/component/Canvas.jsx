import { Environment } from "@react-three/drei";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import Experience from "./Experience";

const Cnva = () => {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 8] }}
      className=" absolute top-0 z-[2] pointer-events-none cursor-pointer bg-[#EEEEEE]"
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

// import { Canvas, useThree, useFrame } from "@react-three/fiber";
// import { Suspense, useEffect, useState } from "react";
// import * as THREE from "three";

// const DynamicCamera = () => {
//   const { camera, gl, size } = useThree(); // Access the camera, renderer, and size

//   const [fov, setFov] = useState(50); // Initial FOV value
//   const [aspect, setAspect] = useState(size.width / size.height);

//   useEffect(() => {
//     // Update FOV and aspect ratio on initial load and resize
//     const handleResize = () => {
//       // Update aspect ratio based on canvas size
//       setAspect(gl.domElement.width / gl.domElement.height);

//       // Dynamically calculate FOV based on window height and camera Z position
//       const newFov = (2 * Math.atan(window.innerHeight / (2 * camera.position.z))) * (180 / Math.PI);
//       setFov(newFov);

//       // Update the camera's aspect ratio and FOV
//       camera.aspect = aspect;
//       camera.fov = newFov;
//       camera.updateProjectionMatrix();
//     };

//     // Listen for resize events
//     window.addEventListener("resize", handleResize);

//     // Call on initial render to set up camera correctly
//     handleResize();

//     return () => window.removeEventListener("resize", handleResize);
//   }, [camera, gl, aspect]);

//   useFrame(() => {
//     // Optional: You can update the camera in the render loop if needed.
//     // For example, modifying position or other properties.
//     camera.position.z = 500;
//     camera.lookAt(0, 0, 0); // Make sure camera looks at the center of the scene
//   });

//   return (
//     <Canvas
//       camera={{ position: [0, 0.3, 500], fov: fov, aspect: aspect }}
//       style={{ width: "100%", height: "100%" }}
//     >
//       <Suspense fallback={null}>
//         {/* Your scene content */}
//         <ambientLight intensity={0.4} />
//         {/* Add other components here */}
//       </Suspense>
//     </Canvas>
//   );
// };

// export default DynamicCamera;
