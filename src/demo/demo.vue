<template>
    <div class="app-container">
        <div class="left-container">
            <div class="left-top-container">
                <v-stage ref="stageRef" :config="stageConfig" @mousedown="handleStageMouseDown"
                    @touchstart="handleStageMouseDown" @mouseup="handleStageMouseUp" @touchend="handleStageTouchEnd">
                    <!-- 底层 背景 -->
                    <v-layer>
                        <v-image :config="backgroundConfig"></v-image>
                    </v-layer>
                    <!-- 裁剪区域 -->
                    <v-layer>
                        <v-shape :config="{
                            sceneFunc: (context, shape) => {
                                context.beginPath(); // 开始一个新的路径
                                context.moveTo(200, 100); // 第一个点
                                context.lineTo(600, 100); // 第二个点
                                context.lineTo(400, 300); // 第三个点
                                context.closePath(); // 开头和结尾连线
                                // 使用Konva.js的特殊方法来描边形状，这会应用虚线设置
                                context.fillStrokeShape(shape);
                            },
                            stroke: 'black', // 边框色
                            strokeWidth: 4, // 边框粗细
                            dash: [10, 5] // 设置虚线模式，10像素实线后跟5像素空白
                        }" />
                    </v-layer>
                    <!-- 表层 -->
                    <v-layer>
                        <v-image :config="overlayConfig" @transformend="handleTransformEnd"></v-image>
                        <!-- 添加移动，缩放，旋转 -->
                        <v-transformer ref="transformerRef" />
                    </v-layer>
                </v-stage>
            </div>
            <div class="left-bottom-container">
                <v-stage ref="previewStageRef" :config="stageConfig">
                    <v-layer>
                        <v-image :config="backgroundConfigPreview"></v-image>
                    </v-layer>
                    <v-layer :config="layerConfig">
                        <v-image :config="overlayConfigPreview"></v-image>
                    </v-layer>
                </v-stage>
            </div>
        </div>
        <div class="right-container">
            <div class="right-top-container">
                <CupPreview_3D :imageUrl="imageSrc"></CupPreview_3D>
            </div>
            <div class="right-bottom-container">
                <CupPreview_2D :imageUrl="imageSrc"></CupPreview_2D>
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import CupPreview_3D from "../three/3D.vue"
import CupPreview_2D from "../three/2D.vue"

const transformerRef = ref(null)
const selectedImageName = ref('');

const layerConfig = reactive({
    clipFunc: function (ctx) {
        // 开始路径
        ctx.beginPath();
        // 绘制一个三角形
        ctx.moveTo(200, 100); // 第一个点
        ctx.lineTo(600, 100); // 第二个点
        ctx.lineTo(400, 300); // 第三个点
        ctx.closePath(); // 关闭路径
        // 通过调用 ctx.clip()，设置当前路径为裁剪区域
        ctx.clip();
    }
})

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
    width: stageConfig.width,
    height: stageConfig.height,
    name: "background"
})

const backgroundConfigPreview = reactive({
    name: "background_preview",
    image: background,
    x: 0,
    y: 0,
    width: stageConfig.width,
    height: stageConfig.height
})

const overlay = new Image();
overlay.src = "/src/assets/arrow.png"
const overlayConfig = reactive({
    image: overlay,
    x: 0,
    y: 0,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    width: 300,
    height: 200,
    name: "overlay",
    draggable: true,
    opacity: 0.9,
    globalCompositeOperation: 'source-over' // 这会导致圆形内的图片与矩形相交部分可见
})

const overlayConfigPreview = reactive({
    image: overlay,
    x: 0,
    y: 0,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    width: 300,
    height: 200,
    name: "overlay_preview",
    draggable: false,
    opacity: 0.9,
    globalCompositeOperation: 'source-over' // 这会导致圆形内的图片与矩形相交部分可见
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
    getImage()
}

const imageSrc = ref("/src/assets/background.png")

const stageRef = ref(null)
const previewStageRef = ref(null)

function getImage() {
    console.log("生成图片url")
    const stage = previewStageRef.value.getNode()
    const dataURL = stage.toDataURL({
        pixelRatio: 3, // 增加导出图片的质量
        mimeType: 'image/png',
        quality: 1 // 最高质量
    });
    imageSrc.value = dataURL;
}

function handleStageMouseUp(e) {
    if (selectedImageName.value === "overlay") {
        overlayConfigPreview.x = e.target.x(); // 更新矩形的 x 坐标
        overlayConfigPreview.y = e.target.y(); // 更新矩形的 y 坐标
        overlayConfigPreview.rotation = e.target.rotation(); // 更新矩形的旋转角度
        overlayConfigPreview.scaleX = e.target.scaleX(); // 更新矩形的 x 轴缩放比例
        overlayConfigPreview.scaleY = e.target.scaleY(); // 更新矩形的 y 轴缩放比例
    }
    getImage()
}

watch(overlayConfig, (newVal, oldVal) => {
    console.log("new value: ", newVal)
    Object.keys(newVal).forEach(key => {
        if (key !== "name" && key !== "draggable") {
            overlayConfigPreview[key] = newVal[key]
        }
    })
    console.log(overlayConfigPreview)
})

watch(backgroundConfig, (newVal, oldVal) => {
    Object.keys(newVal).forEach(key => {
        if (key !== "name" && key !== "draggable") {
            backgroundConfigPreview[key] = newVal[key]
        }
    })
    console.log(backgroundConfigPreview)
})

onMounted(() => {
    console.log("onMounted")
})
</script>

<style lang="less" scoped>
.app-container {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;

    .left-container {
        height: 100%;
        width: 50%;
        border-right: 2px black solid;
        display: flex;
        flex-direction: column;

        .left-top-container {
            width: 100%;
            height: 50%;
            border-bottom: 2px black solid;
        }

        .left-bottom-container {
            flex: 1;
        }
    }

    .right-container {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        .right-top-container {
            width: 100%;
            height: 50%;
            border-bottom: 2px black solid;
        }
        .right-bottom-container {
            flex: 1;
        }
    }
}
</style>