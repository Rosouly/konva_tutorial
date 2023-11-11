<template>
  <div class="app_container">

    <div class="left">
      <div class="position">({{ x }}, {{ y }})</div>
      <div>
        <button @click="addOrRemoveEditRect">增删裁剪框</button>
      </div>
      <div class="container" @mousedown="handleMouseDown">
        <v-stage ref="leftStageRef" :config="stageConfig">
        </v-stage>
        <img class="background_image" src="/src/assets/background.png">
      </div>
    </div>

    <div class="right">
      <div class="container">
        <v-stage ref="rightStageRef" :config="stageConfig"></v-stage>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.app_container {
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: row;

  .left {
    width: 50%;
    height: inherit;
    position: relative;
    border-right: 1px black solid;

    .container {
      position: absolute;
      top: 100px;
      left: 100px;
      width: 400px;
      height: 600px;
      border: 1px black dashed;
    }
  }

  .right {
    flex: 1;
    height: inherit;
    position: relative;

    .container {
      position: absolute;
      top: 100px;
      left: 100px;
      width: 400px;
      height: 600px;
      border: 1px black dashed;
    }
  }

}
</style>

<script setup>
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { onMounted, reactive, ref, watch, watchEffect } from 'vue';
let container;
let image;



const imageInfo = reactive({
  naturalWidth: Number,
  naturalHeight: Number,
  width: Number,
  height: Number
})

function setImageInfo() {
  imageInfo.naturalWidth = image.naturalWidth
  imageInfo.naturalHeight = image.naturalHeight
  const imageRatio = imageInfo.naturalWidth / imageInfo.naturalWidth
  const containerRation = container.clientWidth / container.clientHeight
  // 宽占满
  if (imageRatio > containerRation) {
    imageInfo.width = container.clientWidth
    imageInfo.height = imageInfo.naturalHeight * (container.clientWidth / imageInfo.naturalWidth)
  } else {
    imageInfo.height = container.clientHeight
    imageInfo.width = imageInfo.naturalWidth * (container.clientHeight / imageInfo.naturalHeight)
  }

  konvaBackgroundImageConfig.width = imageInfo.width
  konvaBackgroundImageConfig.height = imageInfo.height
}

let x = ref(0);
let y = ref(0);

function handleMouseDown(e) {
  x.value = e.offsetX
  y.value = e.offsetY
  let info = `坐标为(${x}, ${y})`
  console.log(info)
  console.log(container.offsetX)
}

// konva.js
// 编辑区域

const leftStageRef = ref(null)
const stageConfig = reactive({
  width: 400,
  height: 600
})

const leftLayer = new Konva.Layer()

const backgroundImage = new Image()
backgroundImage.src = "/src/assets/background.png"
const konvaBackgroundImageConfig = reactive({
  image: backgroundImage,
  width: Number,
  height: Number
})

// 裁剪框
const editRectExist = ref(false)

const editRectWidth = ref(100)
const editRectHeight = ref(100)



const editRectConfig = reactive({
  x: 0, // 相对于舞台的位置
  y: 0,
  width: editRectWidth.value,
  height: editRectHeight.value,
  draggable: true,
  name: "edit_rect",
  stroke: '#00ffff', // 边框色
  strokeWidth: 4, // 边框粗细
})
const editRect = new Konva.Rect(editRectConfig)

editRect.on('transformend', () => {
  console.log('new size:', editRect.width() * editRect.scaleX(), editRect.height() * editRect.scaleY());
});

editRect.on('dragend', () => {
  console.log('position:', editRect.position());
});

const rightRectConfig = reactive({
  width: Number,
  height: Number,
  fill: '#00D2FF', // 图形内填充颜色
})

function updataRightStage() {
  const rightStage = rightStageRef.value.getStage()
  // const konvaRightStage = 
}

const transformer = new Konva.Transformer({
  nodes: [editRect],
  enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'middle-left', 'middle-left', 'middle-right', 'bottom-center'], // 您可以选择启用的控制点
  rotateEnabled: false, // 禁用旋转功能
})

function addOrRemoveEditRect() {
  if (editRectExist.value) {
    editRect.remove()
    transformer.remove()
    leftLayer.draw()
    editRectExist.value = false
  } else {
    leftLayer.add(editRect)
    leftLayer.add(transformer)
    leftLayer.draw()
    editRectExist.value = true
  }
}

// 预览区域

const rightLayer = new Konva.Layer()
const rightBackgroundImage = new Image()
rightBackgroundImage.src = "/src/assets/background.png"




const rightStageRef = ref(null)
function rightStageInit() {
  const rightStage = rightStageRef.value.getStage()
  console.log("rightStage", rightStage)
  const konvaRightBackgroundImage = new Konva.Image(konvaBackgroundImageConfig)
  rightLayer.add(konvaRightBackgroundImage)
  rightStage.add(rightLayer)
}

// 图片


// 挖空区域


//

function stageInit() {
  const stage = leftStageRef.value.getStage()
  console.log("stage", stage)
  const konvaBackgroundImage = new Konva.Image(konvaBackgroundImageConfig)
  leftLayer.add(konvaBackgroundImage)
  stage.add(leftLayer)
}

// 元素挂载后
onMounted(() => {
  container = document.querySelector('.container')
  image = document.querySelector('.background_image')
  setImageInfo()
  stageInit()
  rightStageInit()
  image.remove()
  console.log(imageInfo)
  // console.dir(container) // 查看容器的属性
  // container.innerHTML = 123123
  // console.log(image.naturalWidth)

})
</script>