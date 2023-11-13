<template>
    <button @click="batchDownloadImage">导出图片</button>
    <v-stage ref="stageRef" :config="stageConfig" @mousedown="handleStageMouseDown" @touchstart="handleStageMouseDown">
        <v-layer>
            <v-image :config="Image0Config"></v-image>
        </v-layer>
        <v-layer>

            <!-- 需要被替换的图层 -->
            <v-image :config="Image1Config"></v-image>
            <v-image :config="Image2Config" @transformend="handleTransformEnd"></v-image>
            <v-transformer ref="transformerRef" />

        </v-layer>
        <v-layer>
            <v-image class="shadow_image" :config="Image3Config"></v-image>
        </v-layer>
    </v-stage>
    <div class="non-show">
        <v-stage ref="stage1Ref" :config="stageConfig"></v-stage>
    </div>
    <div>
        <image src="https://th.bing.com/th?id=OPA.65PhRKuFIYFazw474C474&o=5&pid=21.1&c=4&h=224&w=268&rs=1"></image>
    </div>
</template>

<script setup>
import Konva from 'konva';
import { onMounted, reactive, ref } from 'vue';

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
Image1.src = "/src/assets/1.png" // 带透明的图片（被替换的图片）
const Image1Config = reactive({
    image: Image1,
    width: 500,
    height: 500
})

const Image2 = new Image()
Image2.src = "https://abd-amazon-output.oss-cn-shenzhen.aliyuncs.com/oversea/replacement.png?OSSAccessKeyId=LTAI5tMJJDbcxJZekS7GjAvr&Expires=1699871412&Signature=i9%2BV%2BTaKGSIkTbFsx1oycUR5Fy4%3D" // 不透明的图片（替换的图片）
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

// -----------------------------------
// -----------------------------------
// -----------------------------------
// -----------------------------------
// -----------------------------------
// -----------------------------------
// -----------------------------------
// -----------------------------------



class ImageObject {
    // 默认宽高为500
    constructor(src, width = 500, height = 500, options = {}) {
        this.src = src;
        this.width = width;
        this.height = height;
        this.options = options;
    }
}

function createKonvaImage(image) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            // 图片加载完成后，创建 Konva.Image 对象
            const konvaImage = new Konva.Image({
                image: img,
                width: image.width,
                height: image.height,
                ...image.options
            });
            resolve(konvaImage); // 解决 Promise，返回 Konva.Image 对象
        };

        img.onerror = () => {
            reject(new Error("Image failed to load")); // 如果图片加载失败，拒绝 Promise
        };

        img.src = image.src; // 设置图片源，开始加载过程
        img.crossOrigin = 'Anonymous'
    });
}


let imageInfo = [
    {
        src: "/src/assets/3.png",
        type: 1
    },
    {
        src: "/src/assets/1.png",
        type: 2
    },
    {
        src: "/src/assets/阴影.png",
        type: 3
    }
]

let changeImageInfo = [
    // {
    //     src: "https://abd-amazon-output.oss-cn-shenzhen.aliyuncs.com/oversea/replacement.png?OSSAccessKeyId=LTAI5tMJJDbcxJZekS7GjAvr&Expires=1699874709&Signature=4cCqRqI%2F3t9i5vYs0xpV3%2Fe3O74%3D",
    // }
    // {
    //     src: "/src/assets/background.png",
    // },
    {
        src: "https://abd-amazon-output.oss-cn-shenzhen.aliyuncs.com/oversea/replacement.png?OSSAccessKeyId=LTAI5tMJJDbcxJZekS7GjAvr&Expires=1699871412&Signature=i9%2BV%2BTaKGSIkTbFsx1oycUR5Fy4%3D",
    }
]

// 如果type = 1
let bottomImages = [];
// 如果type = 2
let replaceableImages = [];
// 如果type = 3
let overlayImages = [];

imageInfo.forEach(item => {
    let imageObject = new ImageObject(item.src);
    switch (item.type) {
        case 1:
            bottomImages.push(imageObject);
            break;
        case 2:
            replaceableImages.push(imageObject);
            break;
        case 3:
            overlayImages.push(imageObject);
            break;
        default:
            break;
    }
})


const stage1Ref = ref(null)
async function BatchImage(image) {
    // 创建一个舞台
    const stage = stage1Ref.value.getNode();

    // 加载所有底部图片，并添加到bottomLayer
    const bottomLayer = new Konva.Layer();
    const loadedBottomImages = await Promise.all(bottomImages.map(item => createKonvaImage(item)));
    loadedBottomImages.forEach(konvaImage => bottomLayer.add(konvaImage));
    stage.add(bottomLayer);

    // 加载所有可替换图片，并添加到replaceLayer
    const replaceLayer = new Konva.Layer();
    const loadedReplaceableImages = await Promise.all(replaceableImages.map(item => createKonvaImage(item)));
    loadedReplaceableImages.forEach(konvaImage => replaceLayer.add(konvaImage));

    // 处理素材图
    const imageObject = new ImageObject(image.src, 500, 500, { globalCompositeOperation: "source-atop", name: "target", draggable: true });
    const konvaImageReplace = await createKonvaImage(imageObject);
    replaceLayer.add(konvaImageReplace);
    stage.add(replaceLayer);

    // 加载所有覆盖图片，并添加到overlayLayer
    const overlayLayer = new Konva.Layer();
    const loadedOverlayImages = await Promise.all(overlayImages.map(item => createKonvaImage(item)));
    loadedOverlayImages.forEach(konvaImage => overlayLayer.add(konvaImage));
    stage.add(overlayLayer);

    downloadImage(stage);

    console.log("移除layer之前的stage：", stage)

    stage.children.forEach(layer => {
        layer.remove()
    });

    console.log("移除layer之后的stage：", stage)

    stage.draw();
}

async function batchDownloadImage() {
    for (let item of changeImageInfo) {
        await BatchImage(item);
    }
}

function downloadImage() {
    // const stage = stageRef.value.getNode();
    const stage = stage1Ref.value.getNode();
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

/* .non-show {
    display: none;
} */
</style>