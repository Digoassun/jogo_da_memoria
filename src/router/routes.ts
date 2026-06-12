import Game from "@/page/Game.vue";
import Home from "@/page/Home.vue";

export const routes = [
    {
        path: '/',
        component:Home
    },
    {
        path:'/game',
        component: Game
    }
]