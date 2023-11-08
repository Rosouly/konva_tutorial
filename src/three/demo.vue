<template>
    <div ref="threeJsContainer" class="three-js-container"></div>
</template>
  
<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import * as THREE from 'three';

const props = defineProps({
    imageUrl: String
})


watch(() => props.imageUrl, (newVal, oldVal) => {
    if (cylinderMaterial.value && cylinder) {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(newVal);
        cylinderMaterial.value.map = texture;
        cylinderMaterial.value.needsUpdate = true; // 告诉 Three.js 需要更新材质
    }
});

const threeJsContainer = ref(null);

let scene, camera, renderer, cylinder;

onMounted(() => {
    initThreeJs();
    animate();
});

onUnmounted(() => {
    if (renderer) {
        renderer.dispose();
    }
});

// 定义响应式引用存储圆柱体的材质
const cylinderMaterial = ref();

function initThreeJs() {
    const width = threeJsContainer.value.clientWidth;
    const height = threeJsContainer.value.clientHeight;

    // 创建场景
    scene = new THREE.Scene();

    // 创建摄像机
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // 创建渲染器并将其大小设置为容器大小
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    threeJsContainer.value.appendChild(renderer.domElement);

    // 加载纹理
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(props.imageUrl); // 将这里的路径替换为你的图片路径


    // 添加几何体 - 在这里是一个圆柱体
    const geometry = new THREE.CylinderGeometry(1, 1, 2, 32); // 圆柱体参数为顶部半径、底部半径、高度、径向分段数

    // 修改UV映射
    const uvAttribute = geometry.attributes.uv;
    for (let i = 0; i < uvAttribute.count; i++) {
        const u = uvAttribute.getX(i);
        const v = uvAttribute.getY(i);

        // 将顶面和底面的UV坐标设置到纹理的左上角
        if (v === 0 || v === 1) {
            uvAttribute.setXY(i, u, v);
        } else {
            // 对于侧面，我们将V坐标映射到高度上
            uvAttribute.setXY(i, u, v * height);
        }
    }

    cylinderMaterial.value = new THREE.MeshBasicMaterial({ map: texture }); // 使用贴图作为材质
    cylinder = new THREE.Mesh(geometry, cylinderMaterial.value);

    // 将圆柱体添加到场景中
    scene.add(cylinder);
}

function animate() {
    requestAnimationFrame(animate);

    // 旋转圆柱体
    // cylinder.rotation.x += 0.01;
    cylinder.rotation.y += 0.02;

    // 渲染场景
    renderer.render(scene, camera);
}
</script>
  
<style>
.three-js-container {
    height: 100vh;
}
</style>
  