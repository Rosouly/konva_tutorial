<template>
    <v-stage :config="stageSize">
      <v-layer>
        <v-text
          @dragstart="handleDragStart"
          @dragend="handleDragEnd"
          :config="{
            text: 'Draggable Text',
            x: 50,
            y: 50,
            draggable: true,
            fill: isDragging ? 'green' : 'black'
          }"
        />
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

  // 控制颜色
  const isDragging = ref(false);
  
  const handleDragStart = () => {
    isDragging.value = true;
  };
  
  const handleDragEnd = () => {
    isDragging.value = false;
  };
  </script>
  