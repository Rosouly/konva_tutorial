<template>
    <v-stage :config="stageSize">
      <v-layer>
        <v-image v-if="image" :config="{ image: image }" />
      </v-layer>
    </v-stage>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const stageSize = ref({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const image = ref(null);
  
  onMounted(() => {
    const img = new Image();
    img.src = "https://konvajs.org/assets/yoda.jpg";
    img.onload = () => {
      image.value = img;
    };
  });
  </script>
  