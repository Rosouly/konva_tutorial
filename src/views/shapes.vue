<template>
    <div>
        <v-stage :config="stageSize">
            <v-layer>
                <v-text :config="{ text: 'Some text on canvas', fontSize: 15 }" />
                <v-rect :config="{
                    x: 20,
                    y: 50,
                    width: 100,
                    height: 100,
                    fill: 'red',
                    shadowBlur: 10
                }" />
                <v-circle :config="{
                    x: 200,
                    y: 100,
                    radius: 50,
                    fill: 'green'
                }" />
                <v-line :config="{
                    x: 20, // 线条的起始 x 坐标（相对于其父层）
                    y: 200, // 线条的起始 y 坐标（相对于其父层），意思就是父层的(20, 200)相当于子层的(0,0)
                    points: [0, 0, 100, 0, 100, 100], // 线条的点集合，表示为 [x1, y1, x2, y2, ..., xn, yn]
                    tension: 0.5, // 曲线的张力，用于创建更平滑的曲线
                    closed: true, // 指示路径是否闭合，此处为真，表示路径的起点和终点相连
                    stroke: 'black', // 线条的描边颜色
                    fillLinearGradientStartPoint: { x: -50, y: -50 }, // 线性渐变填充的起始点坐标
                    fillLinearGradientEndPoint: { x: 50, y: 50 }, // 线性渐变填充的结束点坐标
                    fillLinearGradientColorStops: [0, 'red', 1, 'yellow'] // 线性渐变的颜色断点，0 表示渐变开始，1 表示渐变结束
                }" />
            </v-layer>
            <v-layer></v-layer>
        </v-stage>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';

const stageSize = ref({
    width: window.innerWidth,
    height: window.innerHeight
});
</script>
  