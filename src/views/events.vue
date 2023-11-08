<template>
    <v-stage ref="stage" :config="stageSize" >
      <v-layer>
        <v-regular-polygon
          @mousemove="handleMouseMove"
          @mouseout="handleMouseOut"
          :config="{
            x: 80,
            y: 120,
            sides: 3,
            radius: 80,
            fill: '#00D2FF',
            stroke: 'black',
            strokeWidth: 4
          }"
        />
        <v-text :config="{
          x: 10,
          y: 10,
          fontFamily: 'Calibri',
          fontSize: 24,
          text: textValue,
          fill: 'black'
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
  const textValue = ref('');
  
  const stage = ref(null);
  
  const writeMessage = (message) => {
    textValue.value = message;
  };
  
  const handleMouseOut = () => {
    writeMessage('Mouseout triangle');
  };
  
  const handleMouseMove = (event) => {
    const stageNode = stage.value.getNode();
    const mousePos = stageNode.getPointerPosition(); // 返回的是相对于舞台的坐标位置，所以不需要做额外的偏移计算
    const x = mousePos.x;
    const y = mousePos.y;
    writeMessage(`x: ${x}, y: ${y}`);
  };
  </script>
  