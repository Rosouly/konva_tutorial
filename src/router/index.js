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
import Menu from "../views/menu.vue"
import Composite from "../views/composite.vue"

import Demo from "../demo/demo.vue"
import Demo1 from "../demo/demo1.vue"
import Demo2 from "../demo/demo2.vue"

import Tree_3D from "../three/3D.vue"

import Version1 from "../iteration/version1.vue"

import Tif from "../tif/index.vue"

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
  { path: '/view/composite', component: Composite },
  { path: '/', component: Menu },
  { path: '/demo/demo', component: Demo },
  { path: '/demo/demo1', component: Demo1 },
  { path: '/demo/demo2', component: Demo2 },
  { path: '/three/3d', component: Tree_3D },
  { path: '/iteration/version1', component: Version1 },
  { path: '/tif/index', component: Tif }
]

// 创建router实例
const router = createRouter({
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})

export default router
