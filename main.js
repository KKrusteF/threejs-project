import * as THREE from 'three';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();

loader.load(
  'plane_animation.gltf',
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x0000ff, 1);
    scene.add(hemisphereLight);

    const mixer = new THREE.AnimationMixer(model);
    gltf.animations.forEach((clip) => {
      mixer.clipAction(clip).play();
    });

    const animate = () => {
      requestAnimationFrame(animate);
      mixer.update(0.0033);
      renderer.render(scene, camera);
    };
    animate();
  },
);

camera.position.z = 7;

function resizeRendererToDisplaySize() {
  const canvas = renderer.domElement;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}

window.addEventListener('resize', resizeRendererToDisplaySize);

function animate() {
  requestAnimationFrame(animate);
  resizeRendererToDisplaySize();
  renderer.render(scene, camera);
}

animate();
