import * as THREE from "three";
import gsap from "gsap";
import vertexShader from "./component/Shader/vertex.glsl";
import fragmentShader from "./component/Shader/fragment.glsl";
import Lenis from "lenis";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let scene, camera, renderer;

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 100, 1000);
camera.position.z = 500;
camera.fov = (180 * (2 * Math.atan(window.innerHeight / 2 / 500))) / Math.PI;
camera.updateProjectionMatrix();

scene = new THREE.Scene();

let webglImages = [];

function setimageArray() {
  const images = [...document.querySelectorAll("[data-webgl-media]")];

  const imageGeo = new THREE.PlaneGeometry(1, 1, 30, 30);
  webglImages = images.map((img, i) => {
    // img.style.opacity = 0
    const { width, height, top, left } = img.getBoundingClientRect();

    const imageMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: new THREE.TextureLoader().load(img.src) },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uEnter: { value: 0 },
        aspectRatio: { value: new THREE.Vector2(width, height) },
      },
      //   wireframe:true
    });
    const mesh = new THREE.Mesh(imageGeo, imageMaterial);
    mesh.scale.set(width, height, 1);

    mesh.position.x = left - sizes.width / 2 + width / 2;
    mesh.position.y = -top + sizes.height / 2 - height / 2;
    scene.add(mesh);

    img.addEventListener("mousemove", (e) => {
      const x = e.offsetX / img.width;
      const y = 1 - e.offsetY / img.height;

      gsap.to(imageMaterial.uniforms.uMouse.value, {
        x: x,
        y: y,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
    });

    img.addEventListener("mouseenter", () => {
      gsap.to(imageMaterial.uniforms.uEnter, {
        value: 1,
        duration: 0.5,
        ease: "circ",
      });
    });

    img.addEventListener("mouseleave", () => {
      gsap.to(imageMaterial.uniforms.uEnter, {
        value: 0,
        duration: 0.5,
        ease: "circ",
      });
    });

    return {
      mesh,
      material: imageMaterial,
      img,
    };
  });
}
setimageArray();

renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setAnimationLoop(animate);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const clock = new THREE.Clock();

function updatePlanesPosition() {
  webglImages.forEach((object, index) => {
    const { width, height, top, left } = object.img.getBoundingClientRect();

    object.mesh.scale.set(width, height, 1);

    object.mesh.position.x = left - sizes.width / 2 + width / 2;
    object.mesh.position.y = -top + sizes.height / 2 - height / 2;
  });
}

lenis.on("scroll", updatePlanesPosition);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  renderer.setSize(sizes.width, sizes.height);

  camera.aspect = sizes.width / sizes.height;

  webglImages.forEach((object, index) => {
    const { width, height, top, left } = object.img.getBoundingClientRect();

    object.mesh.scale.set(width, height, 1);

    object.mesh.position.x = left - sizes.width / 2 + width / 2;
    object.mesh.position.y = -top + sizes.height / 2 - height / 2;
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  camera.updateProjectionMatrix();
  updatePlanesPosition();
});

function animate() {
  webglImages.forEach((object, i) => {
    object.material.uniforms.uTime.value = clock.getElapsedTime();
  });

  controls.update();

  updatePlanesPosition();
  renderer.render(scene, camera);
}

// html text-animation
const text = [...document.querySelectorAll(".text")];
text.forEach((item) => {
  // text[1].classList.add("hover");
  item.addEventListener("click", () => {
    text.forEach((item) => {
      item.classList.add("hover");
      gsap.to(item, {
        duration: 0.5,
        ease: "power2.inOut",
      });
    });
    item.classList.remove("hover");
  });
});

const links = document.querySelectorAll(".link-item");

links.forEach((link) => {
  link.classList.add("active");

  link.addEventListener("mouseover", () => {
    links.forEach((l) => {
      l.classList.add("blur-effect");
      l.classList.remove("active");
    });
    link.classList.remove("blur-effect");
  });

  link.addEventListener("mouseout", () => {
    links.forEach((l) => l.classList.remove("blur-effect"));
  });
});
