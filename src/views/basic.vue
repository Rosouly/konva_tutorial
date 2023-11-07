<template>
  <div>
    <!-- v-stage 组件代表Konva的舞台，这里绑定配置和监听拖拽事件 -->
    <v-stage ref="stage" :config="configKonva" @dragstart="handleDragstart" @dragend="handleDragend">
      <!-- v-layer 组件代表Konva的层 -->
      <v-layer ref="layer">
        <!-- v-star 组件用于渲染星星，这里用 v-for 来渲染一个列表中的每个项目 -->
        <v-star v-for="item in list" :key="item.id" :config="starConfig(item)"></v-star>
      </v-layer>
    </v-stage>
  </div>
</template>
  
<script setup>
import { ref, reactive, onMounted, watch } from 'vue';

// 生成30个星星随机分布
onMounted(() => {
  for (let n = 0; n < 30; n++) {
    list.push({
      id: n.toString(),
      x: Math.random() * width, // x 坐标
      y: Math.random() * height, // y 坐标
      rotation: Math.random() * 180, // 旋转角度
      scale: Math.random() // 缩放比例
    });
  }
});

// 获取浏览器窗口的宽度和高度
const width = window.innerWidth;
const height = window.innerHeight;

// 所有的星星的列表
const list = reactive([]);
// 被拖拽的星星的id
const dragItemId = ref(null);

// 设置舞台 stage 的长宽
const configKonva = reactive({
  width: width,
  height: height
});

// 处理拖拽开始的事件
function handleDragstart(e) {
  // 保存被拖拽元素的ID
  dragItemId.value = e.target.id();
  // 将当前元素移到列表的顶部
  const item = list.find(i => i.id === dragItemId.value);
  const index = list.indexOf(item);
  list.splice(index, 1); // 移除元素
  list.push(item); // 放到数组末尾，使得当前元素在所有元素上方渲染
}

// 处理拖拽结束的事件
function handleDragend(e) {
  // 清空被拖拽元素的ID
  dragItemId.value = null;
}

// 生成星星配置的函数
function starConfig(item) {
  return {
    x: item.x, // x坐标，决定星星在画布上的水平位置
    y: item.y, // y坐标，决定星星在画布上的垂直位置
    rotation: item.rotation, // 旋转角度，决定星星旋转多少度
    id: item.id, // 唯一标识符，用于追踪星星
    numPoints: 5, // 星星的尖角数量
    innerRadius: 30, // 星星内圆的半径
    outerRadius: 50, // 星星外圆的半径
    fill: '#89b717', // 填充颜色
    opacity: 0.8, // 不透明度
    draggable: true, // 是否可拖动
    scaleX: dragItemId.value === item.id ? item.scale * 1.2 : item.scale, // 水平缩放比例，如果是被拖动的星星则放大1.2倍
    scaleY: dragItemId.value === item.id ? item.scale * 1.2 : item.scale, // 垂直缩放比例，如果是被拖动的星星则放大1.2倍
    shadowColor: 'black', // 阴影颜色
    shadowBlur: 10, // 阴影模糊度
    shadowOffsetX: dragItemId.value === item.id ? 15 : 5, // 阴影水平偏移量，如果是被拖动的星星则偏移量增大
    shadowOffsetY: dragItemId.value === item.id ? 15 : 5, // 阴影垂直偏移量，如果是被拖动的星星则偏移量增大
    shadowOpacity: 0.6 // 阴影的不透明度
  };
}
</script>
  
<style>
body {
  margin: 0;
  padding: 0;
}
</style>
  