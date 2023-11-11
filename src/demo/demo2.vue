<template>
    <v-stage ref="stageRef" :config="stageConfig">
        <v-layer>
            <!-- <v-image :config="imageConfig"></v-image> -->
        </v-layer>
    </v-stage>
    <button @click="updateStage">移除图片</button>
    <button @click="addEditRect">增删裁剪框</button>
</template>

<script setup>
import Konva from 'konva';
import { onMounted, reactive, ref } from 'vue';

const stageConfig = reactive({
    width: 800,
    height: 400
})

const layer = new Konva.Layer()
const backgroundimage = new Image()

backgroundimage.src = "/src/assets/background.png"
const imageConfig = reactive({
    image: backgroundimage,
    name: "background_image",
    width: 800,
    height: 400
})
const konvaImage = new Konva.Image(imageConfig)

layer.add(konvaImage)

const stageRef = ref(null);

// 裁剪框
const editRectConfig = reactive({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    draggable: true,
    name: "edit_rect",
    stroke: '#00ffff', // 边框色
    strokeWidth: 4, // 边框粗细
})
const editRect = new Konva.Rect(editRectConfig)
editRect.on('transform', () => {
    console.log(editRect.width())
})

const transformer = new Konva.Transformer({
    nodes: [editRect],
    enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'middle-left'], // 您可以选择启用的控制点
    rotateEnabled: false, // 禁用旋转功能
    keepRatio: false,
})

const editRectExist = ref(false)

function addEditRect() {
    if (editRectExist.value) {
        editRect.remove()
        transformer.remove()
        layer.draw()
        editRectExist.value = false
    } else {
        layer.add(editRect)
        layer.add(transformer)
        layer.draw()
        editRectExist.value = true
    }
}


// function updateStage() {
//     konvaImage.remove()
//     layer.draw()
// }

onMounted(() => {
    console.log(stageRef.value.getStage())
    const stage = stageRef.value.getStage()
    stage.add(layer)
})
</script>