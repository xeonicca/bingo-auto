import Home from './views/Home.vue'
import Bingo from './views/Bingo.vue'
import About from './views/About.vue'
import Form from './views/Form.vue'
import NotFound from './views/NotFound.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home, meta: { title: '對獎囉' } },
    { path: '/bingo/:hash', component: Bingo, meta: { title: 'Bingo卡' } },
    {
      path: '/about',
      meta: { title: '其他' },
      component: About,
      // example of route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('./views/About.vue')
    },
    {
      path: '/form',
      meta: { title: '表單' },
      component: Form,
      // example of route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('./views/About.vue')
    },
    { path: '/:path(.*)', component: NotFound },
  ],

  scrollBehavior(to, from, savedPosition) {
    return { left: 0, top: 0 }
  },
})

export default router
