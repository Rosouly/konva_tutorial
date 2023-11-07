<template>
    <div>
      Click on canvas to create a circle.
      <a href=".">Reload the page</a>. Circles should stay here.
      <v-stage
        :config="stageSize"
        @click="handleClick"
      >
        <v-layer>
          <v-circle
            v-for="item in list"
            :key="item.id"
            :config="item"
          ></v-circle>
        </v-layer>
        <v-layer></v-layer>
      </v-stage>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const stageSize = ref({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const list = ref([{ x: 100, y: 100, radius: 50, fill: 'blue', id: 0 }]);
  
  const load = () => {
    const data = localStorage.getItem('storage');
    if (data) {
      list.value = JSON.parse(data);
    }
  };
  
  const save = () => {
    localStorage.setItem('storage', JSON.stringify(list.value));
  };
  
  const handleClick = (evt) => {
    const stage = evt.target.getStage();
    const pos = stage.getPointerPosition();
    list.value.push({
      radius: 50,
      fill: 'red',
      id: list.value.length,
      ...pos
    });
  
    save();
  };
  
  onMounted(() => {
    load();
  });
  </script>
  