import Home from './views/Home.vue'
import Bingo from './views/Bingo.vue'
import About from './views/About.vue'
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
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
  { path: '/:path(.*)', component: NotFound },
]
