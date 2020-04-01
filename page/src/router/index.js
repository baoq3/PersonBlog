import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Person from '../views/Person'
import Works from '../views/Works'
import Publish from '../views/Publish'
import Index from '../views/index.vue'
import Login from '../views/Login.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Home',
    component: Index,
    children: [{
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: { title: '首页' }
    }, {
      path: '/Person',
      name: 'Person',
      component: Person,
      meta: { title: '个人中心' }
    }, {
      path: '/Works',
      name: 'Works',
      component: Works,
      meta: { title: '作品中心' }
    }, {
      path: '/Publish',
      name: 'Publish',
      component: Publish,
      beforeEnter: (to, from, next) => {
        if (store.state.statePublish !== '') {
          next()
        } else {
          next({ path: '/Home' })
        }
      },
      meta: { title: '发布中心' }
    }]
  }, {
    path: '/Login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
