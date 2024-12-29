import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import vertexShader from "./Shader/vertex.glsl";
import fragmentShader from "./Shader/fragment.glsl";
import * as THREE from "three";

function ImageMesh({ img }) {
  const [texture, setTexture] = useState(null);
  const imgSrc = img.src;

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const newTexture = textureLoader.load(
      imgSrc,
      () => {
        console.log("Texture loaded");
      },
      undefined,
      (err) => {
        console.error("Texture failed to load:", err);
      }
    );
    setTexture(newTexture);
  }, [imgSrc]);

  const meshRef = useRef();
  const materialRef = useRef();

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  useEffect(() => {
    const { width, height, top, left } = img.getBoundingClientRect();
    meshRef.current.scale.set(width, height, 1);
    meshRef.current.position.set(
      left - window.innerWidth / 2 + width / 2,
      -top + window.innerHeight / 2 - height / 2,
      0
    );

    const handleMouseMove = (e) => {
      const x = e.offsetX / img.width;
      const y = 1 - e.offsetY / img.height;
      console.log(x, y);
      gsap.to(materialRef.current.uniforms.uMouse.value, {
        x,
        y,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
    };

    const handleMouseEnter = () => {
      gsap.to(materialRef.current.uniforms.uEnter, {
        value: 1,
        duration: 0.5,
        ease: "circ",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(materialRef.current.uniforms.uEnter, {
        value: 0,
        duration: 0.5,
        ease: "circ",
      });
    };

    img.addEventListener("mousemove", handleMouseMove);
    img.addEventListener("mouseenter", handleMouseEnter);
    img.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      img.removeEventListener("mousemove", handleMouseMove);
      img.removeEventListener("mouseenter", handleMouseEnter);
      img.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [img]);

  return (
    <mesh ref={meshRef} position={[0, 1.8, 0]}>
      <planeGeometry args={[1, 1, 30, 30]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uTexture: { value: texture },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uEnter: { value: 0 },
          aspectRatio: { value: new THREE.Vector2(1, 1) },
        }}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default ImageMesh;
