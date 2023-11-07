<template>
    <div>
      <v-stage :config="configKonva">
        <v-layer>
          <v-circle
            v-for="item in items"
            :key="item.id"
            :config="item"
            @dragstart="handleDragstart"
            @dragend="handleDragend"
          ></v-circle>
        </v-layer>
      </v-stage>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Konva from 'konva';
  
  const configKonva = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const items = ref([]);
  const dragItemId = ref(null);
  
  function generateItems() {
    const itemsArray = [];
    for (let i = 0; i < 10; i++) {
      itemsArray.push({
        x: Math.random() * configKonva.width,
        y: Math.random() * configKonva.height,
        radius: 50,
        id: 'node-' + i,
        fill: Konva.Util.getRandomColor(),
        draggable: true,
      });
    }
    return itemsArray;
  }
  
  const handleDragstart = (e) => {
    dragItemId.value = e.target.id();
    const item = items.value.find((i) => i.id === dragItemId.value);
    const index = items.value.indexOf(item);
    items.value.splice(index, 1);
    items.value.push(item);
  };
  
  const handleDragend = () => {
    dragItemId.value = null;
  };
  
  onMounted(() => {
    items.value = generateItems();
  });
  </script>
  
  <style>
  body {
    margin: 0;
    padding: 0;
  }
  </style>
  