import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mod } from "three/src/nodes/TSL.js";
gsap.registerPlugin(ScrollTrigger);

// Loaders
const canvas = document.querySelector(".models-canvas");
const scene = new THREE.Scene();

// Initialize loaders
const gltfLoader = new GLTFLoader();
const fbxLoader = new FBXLoader();

// Variables to store the model and mixer
let model, mixer;
const tl = gsap.timeline();

// Load the .glb model
gltfLoader.load("/models/Avatar.glb", (gltf) => {
  model = gltf.scene;
  const md = scene.add(model);
  model.position.set(0, -1, -1);
  // camera.lookAt(0, 1, 0);
  // animation
  fbxLoader.load("/animation/Texting.fbx", (fbx) => {
    if (!model) {
      console.log("Model is not loaded yet.");
      return;
    }

    if (fbx.animations && fbx.animations.length > 0) {
      mixer = new THREE.AnimationMixer(model);
      const action = mixer.clipAction(fbx.animations[0]);
      action.play();
      action.setLoop(THREE.LoopRepeat, Infinity);
    } else {
      console.log("No animations found in the FBX file.");
    }
  });
  // Camera animation - slow and smooth transition
  tl.fromTo(
    camera.position,
    {
      y: 14,
      z: 0,
    },
    {
      y: 0,
      z: 5,
      duration: 10, 
      ease: "power1.inOut", 
    }
  );

  // Optional: Make sure the camera looks at the model after the animation
  tl.call(() => {
    camera.lookAt(model.position);
  });
});

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(
  30,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 5);
camera.lookAt(0, 1, 0);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableZoom = false;
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;

// Lighting
const pointLight = new THREE.PointLight("white", 3, 100, 5);
pointLight.position.set(0, -0.2, 0);
scene.add(pointLight);

const pointLight2 = new THREE.PointLight("#ffcc00", 9, 10);
pointLight2.position.set(0.1, -2, 0);
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight("#693C72", 5, 10);
pointLight3.position.set(0, -0.5, -1);
pointLight3.scale.set(3, 3, 3);
scene.add(pointLight3);

// const pointLightHelper = new THREE.PointLightHelper(pointLight3, 1);
// scene.add(pointLightHelper);

const directionalLight = new THREE.DirectionalLight("#ffffff", 5);
directionalLight.position.set(-1, 5, 3);
scene.add(directionalLight);

// const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(helper);

// gsap on model

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const tick = () => {
  window.requestAnimationFrame(tick);

  if (mixer) {
    mixer.update(0.01);
  }
  controls.update(); // Update controls every frame

  renderer.render(scene, camera); // Render the scene
};

tick();
