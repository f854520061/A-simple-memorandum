import Vue from 'vue'
import Router from 'vue-router'
import Todo from '@/views/todo'
import My from '@/views/my'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'todo',
      component: Todo
    },
    {
      path:'/my',
      name:'my',
      component:My
    }
  ]
})
