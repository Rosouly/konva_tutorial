<template>
    <v-stage ref="stage" :config="stageSize">
        <v-layer>
            <v-shape :config="{
                sceneFunc: (context, shape) => {
                    context.beginPath(); // 开始一个新的路径
                    context.moveTo(0, 0); // 画笔从(0,0)开始
                    context.lineTo(180, 0); // 从(0,0)画到(180, 0)
                    
                    context.lineTo(0, 30); // 从(180, 0)画到(0, 30)
                    context.closePath(); // 开头和结尾连线
                    // special Konva.js method to fill and stroke the shape
                    context.fillStrokeShape(shape);
                },
                fill: '#00D2FF', // 图形内填充颜色
                stroke: 'black', // 边框色
                strokeWidth: 4 // 边框粗细
            }" />
        </v-layer>
    </v-stage>
</template>
  
<script setup>
import { ref } from 'vue';

const width = window.innerWidth;
const height = window.innerHeight;
const stageSize = ref({
    width: width,
    height: height
});

</script>
  