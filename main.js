import * as THREE from "three";
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#demo-canvas'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// Scene
const scene = new THREE.Scene();
// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new OrbitControls(camera, renderer.domElement);
// Helpers
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
// Set position for camera
camera.position.set(10, 12, 20);

// Setting Mesh with some Geometry 
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);
// Setting geometry for sence

const planeGeometry = new THREE.PlaneGeometry(30 ,30);
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

// Setting sphere for scene
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000FF,
    wireframe: false,    
    });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

sphere.position.set(-10 ,10, 0);

// Function animate hỗ trợ hoạt ảnh animation của geometry và hỗ trợ camera thay đổi.
function animate() {
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera)
    requestAnimationFrame(animate);
};

animate();