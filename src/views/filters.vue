<template>
    <v-stage :config="stageSize">
      <v-layer>
        <v-rect
          ref="rectRef"
          @mousemove="handleMouseMove"
          :config="{
            filters: filters,
            noise: 1,
            x: 10,
            y: 10,
            width: 50,
            height: 50,
            fill: color,
            shadowBlur: 10
          }"
        />
      </v-layer>
    </v-stage>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Konva from 'konva';
  
  const width = window.innerWidth;
  const height = window.innerHeight;
  const stageSize = ref({
    width: width,
    height: height
  });
  const color = ref('green');
  const filters = ref([Konva.Filters.Noise]);
  const rectRef = ref(null);
  
  const handleMouseMove = () => {
    color.value = Konva.Util.getRandomColor();
    // Recache
    const rectNode = rectRef.value.getNode();
    // May need to redraw layer manually
    rectNode.cache();
  };
  
  onMounted(() => {
    const rectNode = rectRef.value.getNode();
    rectNode.cache();
  });
  </script>
  