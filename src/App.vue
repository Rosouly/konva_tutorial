<template>
  <ul>
    <li>
      <router-link to="/view/basic"> Basic </router-link>
    </li>
    <li>
      <router-link to="/view/cache"> Cache </router-link>
    </li>
    <li>
      <router-link to="/view/custom_shape"> ⭐custom_shape(绘制任意形状的图形,连线可以是直线也可以是曲线)
        (0,0)在左上角，从左往右x增大，从往下y轴增大 </router-link>
    </li>
    <li>
      <router-link to="/view/drag_and_drop"> drag_and_drop(拉拽文本框，其他图形同理) </router-link>
    </li>
    <li>
      <router-link to="/view/events"> ⭐events(显示了鼠标的坐标) </router-link>
    </li>
    <li>
      <router-link to="/view/filters"> filters(给图像添加噪音) </router-link>
    </li>
    <li>
      <router-link to="/view/images"> images(显示图片) </router-link>
    </li>
    <li>
      <router-link to="/view/save_load"> save_load(保存和加载位置信息, 其实就是保存json数据) </router-link>
    </li>
    <li>
      <router-link to="/view/shapes"> ⭐shapes(各种图形, 除了v-shape以外, v-line也可以绘制任意图形) </router-link>
    </li>
    <li>
      <router-link to="/view/simple_animations"> simple_animations(动画, 暂时用不上) </router-link>
    </li>
    <li>
      <router-link to="/view/transformer"> ⭐transformer(变换, 包括放大缩小和旋转) </router-link>
    </li>
    <li>
      <router-link to="/view/zindex"> zindex(和Basic一样, 展示了 让被点击的图形显示在最上面 的方法) </router-link>
    </li>
    <li>
      <router-link to="/demo/demo"> demo </router-link>
    </li>
    <li>
      <router-link to="/demo/demo1"> demo1 </router-link>
    </li>
  </ul>
  
  
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>


</script>

<style lang="less">
body {
  height: 900px;
  width: 100%;
  margin: 0;
  padding: 0;
}

</style>