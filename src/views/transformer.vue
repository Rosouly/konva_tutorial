<template>
    <!-- touchstart是为了支持移动端 -->
    <v-stage :config="stageSize" @mousedown="handleStageMouseDown" @touchstart="handleStageMouseDown">
        <v-layer>
            <v-rect v-for="item in rectangles" :key="item.id" :config="item" @transformend="handleTransformEnd" />
            <v-transformer ref="transformerRef" />
        </v-layer>
    </v-stage>
</template>
  
<script setup>
import { ref, reactive, onMounted } from 'vue';
import Konva from 'konva';

const stageSize = reactive({
    width: window.innerWidth,
    height: window.innerHeight,
});
const rectangles = ref([
    {
        id: 'rect1',
        rotation: 0,
        x: 10,
        y: 10,
        width: 100,
        height: 100,
        scaleX: 1,
        scaleY: 1,
        fill: 'red',
        name: 'rect1',
        draggable: true,
    },
    {
        id: 'rect2',
        rotation: 0,
        x: 150,
        y: 150,
        width: 100,
        height: 100,
        scaleX: 1,
        scaleY: 1,
        fill: 'green',
        name: 'rect2',
        draggable: true,
    },
]);
const selectedShapeName = ref('');

const transformerRef = ref(null);

// 当鼠标按下或触摸开始时，处理舞台上的点击事件，用于选择图形或取消选择
const handleStageMouseDown = (e) => {
    console.log("-------------------")
    console.log("按下鼠标"); // 在控制台输出 "down"，表示函数被调用
    // 如果点击的目标是舞台本身，而不是舞台上的某个图形
    if (e.target === e.target.getStage()) {
        console.log("你点击的是舞台本身,而不是舞台上的某个图形")
        selectedShapeName.value = ''; // 清除任何已选中的图形名
        updateTransformer(); // 调用更新变换器函数，以反映当前没有选中任何图形
        return; // 提前退出函数
    }

    // 检查点击的对象是否是 Transformer 的一部分，意味着已选中的图形正在被变换
    const clickedOnTransformer = e.target.getParent().className === 'Transformer';
    if (clickedOnTransformer) {
        console.log("点击的对象是Transformer的一部分")
        return; // 如果是，那么不执行任何操作并退出函数
    }

    console.log("点击的对象不是Transformer的一部分")
    // 获取点击的目标图形的名称
    const name = e.target.name();
    // 根据图形名称在 rectangles 数组中查找对应的矩形对象
    const rect = rectangles.value.find((r) => r.name === name);
    console.log("rect", rect)
    if (rect) {
        console.log("找到了矩形,设置为选中状态")
        selectedShapeName.value = name; // 如果找到了矩形，设置为选中状态
    } else {
        selectedShapeName.value = ''; // 如果没有找到，清除选中状态
        console.log("没找到矩形,清楚选中状态")
    }
    updateTransformer(); // 调用更新变换器函数，以反映新的选中状态
};

// 处理变换结束事件的函数，当形状变换完成（例如缩放或旋转）后触发
const handleTransformEnd = (e) => {
    // 在 rectangles 数组中找到与选中形状名称匹配的矩形对象
    const rect = rectangles.value.find(
        (r) => r.name === selectedShapeName.value
    );
    // 如果找到了矩形对象
    if (rect) {
        rect.x = e.target.x(); // 更新矩形的 x 坐标
        rect.y = e.target.y(); // 更新矩形的 y 坐标
        rect.rotation = e.target.rotation(); // 更新矩形的旋转角度
        rect.scaleX = e.target.scaleX(); // 更新矩形的 x 轴缩放比例
        rect.scaleY = e.target.scaleY(); // 更新矩形的 y 轴缩放比例
        rect.fill = Konva.Util.getRandomColor(); // 随机更改矩形的填充颜色
    }
};

// 更新变换器（Transformer）的函数，这个函数负责根据当前选中的形状来更新变换器的绑定状态
const updateTransformer = () => {
    console.log("更新变换器")
    // 从 Vue 的 ref 引用中获取 Konva 变换器（Transformer）的节点
    const transformerNode = transformerRef.value.getNode();
    // 获取该变换器所在的舞台（Stage）对象
    const stage = transformerNode.getStage();
    // 根据当前选中的形状名称查找舞台上的对应节点
    const selectedNode = stage.findOne('.' + selectedShapeName.value);
    // 如果当前选中的节点就是变换器当前绑定的节点，则不需要进行任何操作
    if (selectedNode === transformerNode.node()) {
        console.log("当前选中的节点就是变换器当前绑定的节点")
        return;
    }

    // 如果找到了一个选中的节点
    if (selectedNode) {
        // 让变换器绑定到这个节点上，允许用户通过变换器控制这个节点
        console.log("让变换器绑定到这个节点上")
        transformerNode.nodes([selectedNode]);
    } else {
        // 如果没有找到选中的节点，就清空变换器绑定的节点，相当于隐藏变换器
        console.log("没有找到选中的节点，就清空变换器绑定的节点，相当于隐藏变换器")
        transformerNode.nodes([]);
    }
};


onMounted(() => {
    console.log("初始化Transformer")
    updateTransformer();
});
</script>
  