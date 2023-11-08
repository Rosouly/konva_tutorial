<template>
    <v-stage ref="stageRef" :config="stageConfig" @mousedown="handleStageMouseDown" @touchstart="handleStageMouseDown">
        <!-- 底层 背景 -->
        <v-layer>
            <v-image :config="backgroundConfig"></v-image>
        </v-layer>
        <!-- 裁剪区域 -->
        <v-layer>

        </v-layer>
        <!-- 表层 -->
        <v-layer>
            <v-image :config="overlayConfig" @transformend="handleTransformEnd"></v-image>
            <!-- 添加移动，缩放，旋转 -->
            <v-transformer ref="transformerRef" />
        </v-layer>
    </v-stage>
    <img :src="imageSrc" width="800" height="400" />
</template>

<script setup>

import { reactive, ref, watch } from 'vue';

const transformerRef = ref(null)
const selectedImageName = ref('');

const stageConfig = reactive({
    width: 800,
    height: 400
})

const background = new Image();
background.src = "/src/assets/background.png"
const backgroundConfig = reactive({
    image: background,
    x: 0,
    y: 0,
    width: stageConfig.width - 100,
    height: stageConfig.height - 50,
    name: "background"
})

const overlay = new Image();
overlay.src = "/src/assets/overlay.png"
const overlayConfig = reactive({
    image: overlay,
    x: 0,
    y: 0,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    width: 400,
    height: 200,
    name: "overlay",
    draggable: true,
    globalCompositeOperation: 'source-over', // 这会导致圆形内的图片与矩形相交部分可见
})

function handleStageMouseDown(e) {
    console.log("mousedown")
    // 点击的是舞台本身
    const clickTarget = e.target
    const stage = e.target.getStage()
    if (clickTarget === stage) {
        console.log("点击的是舞台本身")
        selectedImageName.value = ""
        updateTransformer()
        return
    }

    // 点击的是Transformer本身
    const clickedOnTransformer = e.target.getParent().className === 'Transformer';
    if (clickedOnTransformer) {
        console.log("点击的对象是Transformer的一部分")
        return; // 如果是，那么不执行任何操作并退出函数
    }

    // 点击的是图形
    const name = e.target.name()
    if (name === "overlay") {
        selectedImageName.value = name
    } else {
        selectedImageName.value = ""
    }
    console.log("点击的是图形，名字为：", name)

    updateTransformer()
}

function updateTransformer() {
    const transformerNode = transformerRef.value.getNode()
    const stage = transformerNode.getStage()
    const selectedNode = stage.findOne('.' + selectedImageName.value)

    if (selectedNode) {
        transformerNode.nodes([selectedNode])
    } else {
        transformerNode.nodes([]);
        getImage();
    }
}

function handleTransformEnd(e) {
    if (selectedImageName.value === "overlay") {
        overlayConfig.x = e.target.x(); // 更新矩形的 x 坐标
        overlayConfig.y = e.target.y(); // 更新矩形的 y 坐标
        overlayConfig.rotation = e.target.rotation(); // 更新矩形的旋转角度
        overlayConfig.scaleX = e.target.scaleX(); // 更新矩形的 x 轴缩放比例
        overlayConfig.scaleY = e.target.scaleY(); // 更新矩形的 y 轴缩放比例
    }
}

const imageSrc = ref("")

const stageRef = ref(null)

function getImage() {
    const stage = stageRef.value.getNode()
    const dataURL = stage.toDataURL({
        pixelRatio: 3, // 增加导出图片的质量
        mimeType: 'image/png',
        quality: 1 // 最高质量
    });
    imageSrc.value = dataURL;
}

watch(overlayConfig, (newVal, oldVal) => {
    console.log("new value: ", newVal)
})
</script>