import Game from '@/page/Game.vue'
import Home from '@/page/Home.vue'
import { requirePlayer } from '@/router/guards/requirePlayer'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/game',
    component: Game,
    beforeEnter: requirePlayer,
  },
]
