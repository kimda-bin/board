import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Join from "../views/Join.vue"
import BoardList from "../views/board/list.vue"
import BoardWrite from "../views/board/write.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: "/join",
    component: Join
  },
  {
    path: "/board",
    component: BoardList
  },
  {
    path: "/board/write",
    component: BoardWrite
  }
]

const router = new VueRouter({
  routes
})

export default router
