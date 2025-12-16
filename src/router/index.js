import { createRouter, createWebHistory } from 'vue-router'
import startView from '@/views/startView.vue'
import seriesView from '@/views/seriesView.vue'
import infoView from '@/views/infoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: "/",
    name: "start",
    component: startView
  },
  {
    path: "/serier",
    name: "series",
    component: seriesView
  },
  {
    path: "/information",
    name: "info",
    component: infoView
  }
  ],
})

export default router
  