// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 导入你的组件
import Basic from '../views/basic.vue'
import Cache from '../views/cache.vue'
import CustomShape from "../views/custom_shape.vue"
import DropAndDrop from "../views/drag_and_drop.vue"
import Events from "../views/events.vue"
import Filters from "../views/filters.vue"
import Images from "../views/images.vue"
import SaveLoad from "../views/save_load.vue"
import Shapes from "../views/shapes.vue"
import SimpleAnimations from "../views/simple_animations.vue"
import Transformer from "../views/transformer.vue"
import Zindex from "../views/zindex.vue"

import Demo from "../demo/demo.vue"
import Demo1 from "../demo/demo1.vue"

// 定义路由
// 每个路由都需要映射到一个组件。
const routes = [
  { path: '/view/basic', component: Basic },
  { path: '/view/cache', component: Cache },
  { path: '/view/custom_shape', component: CustomShape },
  { path: '/view/drag_and_drop', component: DropAndDrop },
  { path: '/view/events', component: Events },
  { path: '/view/filters', component: Filters },
  { path: '/view/images', component: Images },
  { path: '/view/save_load', component: SaveLoad },
  { path: '/view/shapes', component: Shapes },
  { path: '/view/simple_animations', component: SimpleAnimations },
  { path: '/view/transformer', component: Transformer },
  { path: '/view/zindex', component: Zindex },
  { path: '/demo/demo', component: Demo },
  { path: '/demo/demo1', component: Demo1}
]

// 创建router实例
const router = createRouter({
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})

export default router
