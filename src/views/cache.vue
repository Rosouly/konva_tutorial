<template>
    <div>
        <v-stage ref="stage" :config="stageConfig">
            <v-layer ref="layer">
                <v-group ref="group">
                    <v-star v-for="item in list" :key="item.id" :config="{
                        x: item.x,
                        y: item.y,
                        rotation: item.rotation,
                        id: item.id,
                        numPoints: 5,
                        innerRadius: 30,
                        outerRadius: 50,
                        fill: '#89b717',
                        opacity: 0.8,
                        shadowColor: 'black',
                        shadowBlur: 10,
                        shadowOpacity: 0.6,
                        scaleX: item.scale,
                        scaleY: item.scale,
                    }" />
                </v-group>
            </v-layer>
        </v-stage>
        <div class="cache">
            <input type="checkbox" @change="handleCacheChange"> cache shapes
        </div>
    </div>
</template>
  
<script setup>
import { ref, reactive, onMounted } from 'vue';

const width = window.innerWidth;
const height = window.innerHeight;
const list = ref([]);
const stageConfig = reactive({
    width: width,
    height: height,
    draggable: true
});
const group = ref(null);

function handleCacheChange(e) {
    const shouldCache = e.target.checked;
    if (shouldCache) {
        // 应用缓存
        group.value.getNode().cache();
    } else {
        // 不应用
        group.value.getNode().clearCache();
    }
}

onMounted(() => {
    for (let n = 0; n < 300; n++) {
        list.value.push({
            id: Math.round(Math.random() * 10000).toString(),
            x: Math.random() * width,
            y: Math.random() * height,
            rotation: Math.random() * 180,
            scale: Math.random()
        });
    }
});


</script>
  
<style>
body {
    margin: 0;
    padding: 0;
}

.cache {
    position: absolute;
    top: 0;
    left: 0;
}
</style>
  