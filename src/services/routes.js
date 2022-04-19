import Home from "@/pages/Home.vue"
import Game from "@/pages/Game.vue"
import Stats from "@/pages/Stats.vue"

const routes = [
  { path: '/', component: Home },
  { path: '/game', component: Game },
  { path: '/statistics', component: Stats },
  { path: '*', redirect: '/'},
]

export {routes}