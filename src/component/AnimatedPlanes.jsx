import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import Fragment from "./Shader/Fragment.glsl";
import Vertex from "./shader/Vertex.glsl";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";

const AnimatedPlanes = ({ texture }) => {
  const [meshes, setMeshes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const materialRef = useRef();
  let clock = new THREE.Clock();

  const hover = useRef(false);

  useEffect(() => {
    const newMeshes = [];
    for (let i = 0; i < 4; i++) {
      const geometry = new THREE.PlaneGeometry(5, 3.5, 100, 100);
      const mesh = new THREE.Mesh(geometry, materialRef.current);
      mesh.scale.set(i === 0 ? 1 : 0, 1, 1);
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      mesh.position.y = 0.1;
      newMeshes.push(mesh);
    }
    setMeshes(newMeshes);
  }, []);

  const handleScroll = (e) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const direction = Math.sign(e.deltaY);
    const nextIndex =
      (currentIndex + direction + meshes.length) % meshes.length;

    // Prepare the next mesh
    meshes[nextIndex].position.x = direction * 15;
    meshes[nextIndex].scale.set(1, 1, 1);

    setTimeout(() => {
      gsap.to(materialRef.current.uniforms.progress, {
        value: 0.2,
        duration: 1,
        ease: "cubic-bezier(0.26,1,0.48,1)",
        onComplete: () => {
          setCurrentIndex(nextIndex);
          setIsAnimating(false);
          materialRef.current.uniforms.progress.value = 0;
        },
      });
    }, 200);

    gsap.to(meshes[currentIndex].position, {
      x: -direction * 10,
      duration: 1,
      ease: "cubic-bezier(0.26,1,0.48,1)",
    });

    gsap.to(meshes[nextIndex].position, {
      x: 0,
      duration: 1,
      ease: "power2.inOut",
    });

    gsap.to(meshes[nextIndex].scale, {
      x: 1,
      duration: 1,
      ease: "power2.inOut",
      delay: 0.1,
    });
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [isAnimating, currentIndex, meshes]);

  useEffect(() => {
    console.log("first")
    const { width, height } = imageMaterial.current.getBoundingClientRect();
console.log("s")

    materialRef.addEventListener("mousemove", (e) => {
      const x = e.offsetX / width;
      const y = (-1 * e.offsetY) / height;

      gsap.to(imageMaterial.uniforms.uMouse.value, {
        x: x,
        y: y,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    });

    imageMaterial.addEventListener("mouseenter", () => {
      gsap.to(imageMaterial.uniforms.uEnter, {
        value: 1,
        duration: 0.5,
        ease: "circ",
      });
    });

    imageMaterial.addEventListener("mouseleave", () => {
      gsap.to(imageMaterial.uniforms.uEnter, {
        value: 0,
        duration: 0.5,
        ease: "circ",
      });
    });

    return () => {
      materialRef.removeEventListener("mousemove", () => {});
      imageMaterial.removeEventListener("mouseenter", () => {});
      imageMaterial.removeEventListener("mouseleave", () => {});
    };
  });

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  }, []);

  const uniforms = useMemo(
    () => ({
      progress: { value: 0.0 },
      direction: { value: 1 },
      uTexture: { value: texture },
      uTime: { value: 0 },
      uFrequency: { value: new THREE.Vector2(1, 2) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uEnter: { value: 0 },
      aspectRatio: { value: new THREE.Vector2(width, height) },
    }),
    []
  );

  return (
    <>
      {meshes.map((mesh, index) => (
        <primitive key={index} object={mesh} />
      ))}
      <shaderMaterial
        ref={materialRef}
        vertexShader={Vertex}
        fragmentShader={Fragment}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />

      {/* <Text
        color="black"
        fontSize={30}
        font="Arial"
        anchorX="center"
        anchorY="middle"
        position={[5, -1, 0]}
        scale={0.5}
      >
        hello
      </Text> */}
    </>
  );
};

export default AnimatedPlanes;
