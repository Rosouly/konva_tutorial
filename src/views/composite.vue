<template>
    <button @click="downloadImage">导出图片</button>
    <v-stage ref="stageRef" :config="stageConfig" @mousedown="handleStageMouseDown" @touchstart="handleStageMouseDown">
        <v-layer>
            <v-image :config="Image0Config"></v-image>
        </v-layer>
        <v-layer>
            <v-group>
                <!-- 需要被替换的图层 -->
                <v-image :config="Image1Config"></v-image>
                <!-- 替换的图层 -->
                <v-image :config="Image2Config" @transformend="handleTransformEnd"></v-image>
                <v-transformer ref="transformerRef" />
            </v-group>
        </v-layer>
        <v-layer>
            <v-image class="shadow_image" :config="Image3Config"></v-image>
        </v-layer>
    </v-stage>
</template>

<script setup>
import { reactive, ref } from 'vue';

const transformerRef = ref(null)
const stageRef = ref(null)
const selectedImageName = ref('');

const stageConfig = reactive({
    x: 0,
    y: 0,
    width: 500,
    height: 500
})

const Image0 = new Image()
Image0.src = "/src/assets/3.png" // 带透明的图片
const Image0Config = reactive({
    image: Image0,
    width: 500,
    height: 500
})

const Image1 = new Image()
Image1.src = "/src/assets/1.png" // 带透明的图片
const Image1Config = reactive({
    image: Image1,
    width: 500,
    height: 500
})

const Image2 = new Image()
Image2.src = "/src/assets/background.png" // 不透明的图片
const Image2Config = reactive({
    image: Image2,
    width: 500,
    height: 500,
    draggable: true,
    globalCompositeOperation: "source-atop", // 图片只显示在非透明的部分，如果没有重叠，如果非透明部分没有重叠，则显示白色
    name: "image2"
})

const Image3 = new Image()
Image3.src = "/src/assets/阴影.png" // 不透明的图片
const Image3Config = reactive({
    image: Image3,
    width: 500,
    height: 500,
    listening: false,  // 这将禁用此图像的事件监听, 让点击事件直接应用的上一层
})

function handleTransformEnd(e) {
    if (selectedImageName.value === "overlay") {
        Image2Config.x = e.target.x(); // 更新矩形的 x 坐标
        Image2Config.y = e.target.y(); // 更新矩形的 y 坐标
        Image2Config.rotation = e.target.rotation(); // 更新矩形的旋转角度
        Image2Config.scaleX = e.target.scaleX(); // 更新矩形的 x 轴缩放比例
        Image2Config.scaleY = e.target.scaleY(); // 更新矩形的 y 轴缩放比例
    }
}

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
    if (name === "image2") {
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
    }
}

function downloadImage() {
    const stage = stageRef.value.getNode();
    const dataURL = stage.toDataURL({
        pixelRatio: 3, // 增加导出图片的质量
        mimeType: 'image/png',
        quality: 1 // 最高质量
    });

    // 创建下载链接
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas-image.png'; // 可以设置一个下载文件的默认名称
    document.body.appendChild(link); // 将链接元素添加到文档中

    // 触发点击事件以开始下载
    link.click();

    // 下载后从文档中移除链接元素
    document.body.removeChild(link);
}
</script>

<style>
.shadow_image {
    pointer-events: none !important;
}
</style>