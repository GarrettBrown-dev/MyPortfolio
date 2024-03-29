import "./css/style.css";
import * as THREE from "three";
//import { GridHelper } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import imgUrl from "./public/img/space.jpg";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(0);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0x130152,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(6, 6, 6);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(650).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load(imgUrl);
scene.background = spaceTexture;

//Me Squared

// const garrettTexture = new THREE.TextureLoader().load("img/Portfolio-Pic.jpg");

// const garrett = new THREE.Mesh(
//   new THREE.BoxGeometry(3, 3, 3),
//   new THREE.MeshBasicMaterial({ map: garrettTexture })
// );

// scene.add(garrett);

//Moon

// const moonTexture = new THREE.TextureLoader().load("img/moon.jpg");
// const normalTexture = new THREE.TextureLoader().load("img/normal.jpg");

// const moon = new THREE.Mesh(
//   new THREE.SphereGeometry(3, 32, 32),
//   new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture })
// );

// scene.add(moon);

// moon.position.z = 30;
// moon.position.setX(-10);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  // moon.rotation.x += 0.05;
  // moon.rotation.y += 0.075;
  // moon.rotation.z += 0.05;

  // garrett.rotation.y += 0.01;
  // garrett.rotation.z += 0.01;

  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
  camera.position.z = t * -0.01;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
