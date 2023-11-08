<template>
  <div class="konva-container">
    <v-stage ref="stage" :config="stageConfig">
      <v-layer :config="groupConfig">
        <v-group >
          <v-line :config="blueBlobConfig"></v-line>
          <v-line :config="redBlobConfig"></v-line>
        </v-group>
      </v-layer>
    </v-stage>
  </div>
</template>
  
<script setup>
import { ref, reactive } from 'vue';

const stageConfig = reactive({
  width: window.innerWidth,
  height: window.innerHeight
});

const groupConfig = reactive({
  clipFunc: function (ctx) {
    // 开始路径
    ctx.beginPath();
    // 绘制一个三角形
    ctx.moveTo(100, 50); // 第一个点
    ctx.lineTo(300, 50); // 第二个点
    ctx.lineTo(200, 150); // 第三个点
    ctx.closePath(); // 关闭路径
    // 通过调用 ctx.clip()，设置当前路径为裁剪区域
    ctx.clip();
  },
  draggable: true,
});

const blueBlobConfig = reactive({
  points: [73, 140, 340, 23, 500, 109, 300, 170],
  stroke: 'blue',
  strokeWidth: 10,
  fill: '#aaf',
  tension: 0.8,
  closed: true,
  draggable: false,
  globalCompositeOperation: 'source-in'
});

const redBlobConfig = reactive({
  points: [73, 140, 340, 23, 500, 109],
  stroke: 'red',
  strokeWidth: 10,
  fill: '#faa',
  tension: 1.2,
  scale: { x: 0.5, y: 0.5 },
  x: 100,
  y: 50,
  closed: true,
  draggable: true
});
</script>
  