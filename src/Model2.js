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
const loadtexture = texture.load("/texture2.png");

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
group.add(ring2);
const ring3Geometry = new THREE.TorusGeometry(1.4, 0.1);
const ring3Material = new THREE.MeshMatcapMaterial({
  matcap: loadtexture,
});
const ring3 = new THREE.Mesh(ring3Geometry, ring3Material);
group.add(ring3);
group.rotateX = -Math.PI / 2;
group.scale.set(0.6, 0.6);

scene.add(group);

// Position camera
camera.position.z = 5;

// Set up GSAP animations
gsap
  .timeline({ repeat: -1 })
  .to(ring1.rotation, {
    z: `-=${Math.PI * 2}`,
    x: `-=${Math.PI * 2}`,
    duration: 4,
    ease: "power4.inOut",
  }).to(ring3.rotation, {
    z: `-=${Math.PI * 2}`,
    x: `-=${Math.PI * 2}`,
    duration: 4,
    ease:"circ.inOut",
  })
  .to(ring2.rotation, {
    z: `+=${Math.PI * 2}`,
    x: `+=${Math.PI * 2}`,
    duration: 4,
    ease:"0.35s cubic-bezier(0.62, 0.05, 0.01, 0.99)",
  })

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
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enablePan = false;

// Lighting
const pointLight = new THREE.PointLight("white", 3, 100, 5);
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
