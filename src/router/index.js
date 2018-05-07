import Vue from 'vue'
import Router from 'vue-router'
import Todo from '@/views/todo'
import My from '@/views/my'
import Todo_list from '@/views/todo_list'
import Todo_detail from '@/views/todo_detail'

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
      component:My,
      children:[
        {
          path:'Todo_list',
          name:'Todo_list',
          component:Todo_list,
          meta:{
            keepAlive: false
          },
          children:[
            {
              path:'Todo_detail',
              name:'Todo_detail',
              component:Todo_detail
            }
          ]
        }
      ]
    }
  ]
})
