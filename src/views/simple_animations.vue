<template>
    <v-stage :config="stageSize">
      <v-layer>
        <v-rect
          @dragstart="changeSize"
          @dragend="changeSize"
          :config="{
            width: 50,
            height: 50,
            fill: 'green',
            draggable: true
          }"
        />
        <v-regular-polygon
          :config="{
            x: 200,
            y: 200,
            sides: 6,
            radius: 20,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4
          }"
        />
      </v-layer>
    </v-stage>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Konva from 'konva';
  
  const stageSize = ref({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const rectRef = ref(null);
  const hexagonRef = ref(null);
  
  const changeSize = (e) => {
    // 'to' is a method of `Konva.Node` instances
    e.target.to({
      scaleX: Math.random() + 0.8,
      scaleY: Math.random() + 0.8,
      duration: 0.2
    });
  };
  
  onMounted(() => {
    const amplitude = 100;
    const period = 5000; // in ms
    const stageNode = rectRef.value.getStage();
    const centerX = stageNode.getWidth() / 2;
    const hexagonNode = hexagonRef.value;
  
    // example of Konva.Animation
    const anim = new Konva.Animation((frame) => {
      const x = amplitude * Math.sin((frame.time * 2 * Math.PI) / period) + centerX;
      hexagonNode.setX(x);
    }, hexagonNode.getLayer());
  
    anim.start();
  });
  </script>
  