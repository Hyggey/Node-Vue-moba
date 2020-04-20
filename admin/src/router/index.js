import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    // 主页面
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/mainPage/main.vue'),
      children:[
        // 新建分类列表
        {
          path:'/categories/creat',
          name:'edit',
          component: () => import('@/views/category/categoryEdit.vue')
        },
        // 新建分类列表带id，新式写法，以前没用过，以前是通过params传参到这个页面，然后判断有无进行页面渲染
        {
          path:'/categories/creat/:id',
          name:'edit',
          component: () => import('@/views/category/categoryEdit.vue'),props:true
        },
        // 分类列表
        {
          path:'/categories/list',
          name:'edit',
          component: () => import('@/views/category/categoryList.vue')
        }
      ]
    }
  ]
})
