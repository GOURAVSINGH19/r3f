import { Environment, PerspectiveCamera, useTexture } from "@react-three/drei";
import React, { useEffect } from "react";
import Lenis from "lenis";
import ImageMesh from "./CanvaImg";
import { useThree } from "@react-three/fiber";

const Experience = () => {
  const [normal] = useTexture(["/SurfaceImperfections003_1K_Normal.jpg"]);

  const lenis = new Lenis();

  useEffect(() => {
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [lenis]);

  const images = [...document.querySelectorAll("[data-webgl-media]")];

  const { camera } = useThree();

  const fov =2 * Math.atan(window.innerHeight / (2 * 500)) * (180 / Math.PI);

  return (
    <>
      <PerspectiveCamera fov={fov} />
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-1.5}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#858585"
          metalness={0.5}
          normalMap={normal}
          roughness={1}
          normalScale={[0.1, 0.1]}
        />
      </mesh>
      <Environment preset="sunset" />
      <ambientLight intensity={0.5} />
      {images.map((img, index) => {
        console.log(img.src);
        return <ImageMesh key={index} img={img} />;
      })}
    </>
  );
};

export default Experience;
