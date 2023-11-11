<template>
    <input type="file" @change="handleFileChange" />
</template>
  
<script setup>
import { ref } from 'vue';
import { fromBlob } from 'geotiff';

const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
        try {
            const tiff = await fromBlob(file);
            const numLayers = await tiff.getImageCount();
            console.log(`文件包含 ${numLayers} 个图层`);
        } catch (error) {
            console.error('解析 TIFF 文件时发生错误', error);
        }
    }
};
</script>