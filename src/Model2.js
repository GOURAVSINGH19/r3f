import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();
// TEXTURES
const texture = new THREE.TextureLoader();
const loadtexture = texture.load("/3.jpeg");

// Camera
const camera = new THREE.PerspectiveCamera(
  70,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 5);
scene.add(camera);

// Loaders
const canvas = document.querySelector(".models2-canvas");
const group = new THREE.Group();

// Create ring1
const ring1Geometry = new THREE.TorusGeometry(2.1, 0.1);
const ring1Material = new THREE.MeshMatcapMaterial({
  matcap: loadtexture,
});
const ring1 = new THREE.Mesh(ring1Geometry, ring1Material);
group.add(ring1);

// Create ring2
const ring2Geometry = new THREE.TorusGeometry(1.8, 0.1);
const ring2Material = new THREE.MeshMatcapMaterial({
  matcap: loadtexture,
});
const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
ring2.rotation.x = Math.PI / 2;
group.add(ring2);

// Create cones
const cone1Geometry = new THREE.ConeGeometry(1, 1.41, 4);
const cone1Material = new THREE.MeshMatcapMaterial({
  matcap: loadtexture,
});
const cone1 = new THREE.Mesh(cone1Geometry, cone1Material);
cone1.position.set(0, 1, 0);
group.add(cone1);

const cone2Geometry = new THREE.ConeGeometry(1, 1.41, 4);
const cone2Material = new THREE.MeshMatcapMaterial({
  matcap: loadtexture,
});
const cone2 = new THREE.Mesh(cone2Geometry, cone2Material);
cone2.position.set(0, -1, 0);
cone2.rotation.x = -Math.PI;
group.add(cone2);
group.scale.set(0.8, 0.8);
scene.add(group);

// Position camera
camera.position.z = 5;

// Set up GSAP animations
gsap
  .timeline({ repeat: -1 })
  .to(ring1.rotation, {
    z: `+=${Math.PI * 2}`,
    x: `+=${Math.PI * 2}`,
    duration: 4,
    ease: "none",
  })
  .to(ring2.rotation, {
    z: `-=${Math.PI * 2}`,
    x: `-=${Math.PI * 2}`,
    duration: 4,
    ease: "none",
  })
  .to(group.rotation, {
    y: Math.PI * 2,
    duration: 4,
    ease: "none",
  });

// resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableZoom = false;
controls.enableDamping = false;
controls.dampingFactor = 0.25;
controls.enablePan = false;

// Lighting
const pointLight = new THREE.PointLight("purple", 3, 100, 5);
pointLight.position.set(0, -0.2, 0);
pointLight.castShadow = true;
scene.add(pointLight);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const tick = () => {
  window.requestAnimationFrame(tick);

  controls.update();

  renderer.render(scene, camera);
};

tick();
