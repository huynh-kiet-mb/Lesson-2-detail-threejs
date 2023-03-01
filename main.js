import * as THREE from "three";
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Sphere } from "three";
import nebula from "./img/1123167.png";
import starLight from "./img/644422.jpg";
import bluePlanet from "./img/501152.jpg";
import stars from "./img/397557.jpg";

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#demo-canvas'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// Render bật đổ bóng
renderer.shadowMap.enabled = true;
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

// Chúng ta thực hiện khởi tạo gui và những giá trị ban đầu 
const gui = new dat.GUI();

const options = {
    sphereColor: '#446ABD',
    wireframe: false,
    speed: 0.01,
    angle: 0.2,
    penumbra: 0,
    intensity: 1
};



// Setting box with some Geometry 
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// Setting plane for sence
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
// Thiết lập bóng sẽ nhận từ tinh cầu 
plane.receiveShadow = true;

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

// Setting sphere for scene
const sphereGeometry = new THREE.SphereGeometry(4);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000FF,
    wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-10, 10, 0);
// Thực hiện tạo đổ bóng cho tinh cầu 
sphere.castShadow = true

// Chúng ta sử dụng gui dat để thay đổi các thành phần của mesh, 1 công cụ hỗ trợ hữu dụng

gui.addColor(options, 'sphereColor').onChange((e) => {
    sphere.material.color.set(e);
});
gui.add(options, 'wireframe').onChange((e) => {
    sphere.material.wireframe = e;
})
gui.add(options, 'speed', 0, 0.1);
gui.add(options, 'angle', 0, 1);
gui.add(options, 'penumbra', 0, 1);
gui.add(options, 'intensity', 0, 1);


// Function animate hỗ trợ hoạt ảnh animation của geometry và hỗ trợ camera thay đổi.
let step = 0;

// --------- AMBIENT LIGHT --------------
// Ambient light khởi tạo
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// --------- DIRECTIONAL LIGHT --------------
// // Directional light khởi tạo
// const directionalLight = new THREE.DirectionalLight(0xFFFFFF,1);
// scene.add(directionalLight);
// // Thực hiện thay đổi vị trí của d light để rõ hơn về nguồn sáng vật thể
// directionalLight.position.set(-30, 50, 0);
// // Thực hiện cho phép ánh sáng tạo bóng cho vật thể từ vị trí chiếu sáng
// directionalLight.castShadow = true;
// // Thay đổi vị trí camera của đổ bóng
// directionalLight.shadow.camera.bottom = -12;

// // Chúng ta thực hiện add thêm light helper vào giúp chúng ta xác định đc vị trí và 
// // vùng sáng của ánh sáng
// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight,10);
// scene.add(dLightHelper);
// // Tại đây chúng ta thực hiện tạo helper cho vc đổ bóng để bk khu vực đổ bóng của vật thể
// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper);


// ------------ SPOT LIGHT -------------
const spotLight = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);
spotLight.position.set(-50, 50, 0);
spotLight.castShadow = true;
spotLight.angle = 0.2;


const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);


// Chúng ta có thuộc tính fog => tạo sương mù khi xa khỏi vật thể 
// scene.fog = new THREE.Fog(0xFFFFFF,0,300);
// Chúng ta cũng có phương thức tạo sương mù theo cấp số nhân theo khoảng cách 
// rất thuận lợi
scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01);

// Thực hiện set background bằng màu rõ ràng.
// renderer.setClearColor(0xFFEA00);
// Thực hiện load background texture với img được đưa từ bên ngoài vào

const textureLoader = new THREE.TextureLoader();
// Chúng ta có thể set up toàn bộ x, y, z là 1 texture duy nhất.
scene.background = textureLoader.load(stars);

// Chúng ta có thể load nhìu mặt của x, y, z là nhiều texture khác nhau theo hình dạng 
// const cubeLoadTexture = new THREE.CubeTextureLoader();
// scene.background = cubeLoadTexture.load([
//     bluePlanet,
//     bluePlanet,
//     starLight,
//     starLight,
//     stars,
//     stars
// ]);


function animate() {
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;

    step += options.speed;

    // Hàm tính toán animation của của sphere theo hướng lên xuống
    sphere.position.y = 10 * (Math.abs(Math.sin(step)) + 0.37);
    // Thực hiện đưa vào thay đổi của spot light 
    spotLight.angle = options.angle;
    spotLight.penumbra = options.penumbra;
    spotLight.intensity = options.intensity;
    sLightHelper.update();
    controls.update();
    renderer.render(scene, camera)
    requestAnimationFrame(animate);
};

animate();