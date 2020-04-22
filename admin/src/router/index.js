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
        },

        // 新建物品列表
        {
          path:'/items/creat',
          name:'itemedit',
          component: () => import('@/views/item/itemEdit.vue')
        },
        // 新建物品列表带id，新式写法，以前没用过，以前是通过params传参到这个页面，然后判断有无进行页面渲染
        {
          path:'/items/creat/:id',
          name:'itemedit',
          component: () => import('@/views/item/itemEdit.vue'),props:true
        },
        // 物品列表
        {
          path:'/items/list',
          name:'itemList',
          component: () => import('@/views/item/itemList.vue')
        },

        // 新建英雄列表
        {
          path:'/heros/creat',
          name:'heroedit',
          component: () => import('@/views/hero/heroEdit.vue')
        },
        // 新建英雄列表带id，新式写法，以前没用过，以前是通过params传参到这个页面，然后判断有无进行页面渲染
        {
          path:'/heros/creat/:id',
          name:'heroedit2',
          component: () => import('@/views/hero/heroEdit.vue'),props:true
        },
        // 英雄列表
        {
          path:'/heros/list',
          name:'herolist',
          component: () => import('@/views/hero/heroList.vue')
        },

        // 新建文章列表
        {
          path:'/articles/creat',
          name:'articledit',
          component: () => import('@/views/article/articleEdit.vue')
        },
        // 新建文章列表带id，新式写法，以前没用过，以前是通过params传参到这个页面，然后判断有无进行页面渲染
        {
          path:'/articles/creat/:id',
          name:'articledit2',
          component: () => import('@/views/article/articleEdit.vue'),props:true
        },
        // 文章列表
        {
          path:'/articles/list',
          name:'articlelist',
          component: () => import('@/views/article/articleList.vue')
        },

        // 新建广告位列表
        {
          path:'/ads/creat',
          name:'adsedit',
          component: () => import('@/views/ad/adEdit.vue')
        },
        // 新建广告位列表带id，新式写法，以前没用过，以前是通过params传参到这个页面，然后判断有无进行页面渲染
        {
          path:'/ads/creat/:id',
          name:'adsdit2',
          component: () => import('@/views/ad/adEdit.vue'),props:true
        },
        // 广告位列表
        {
          path:'/ads/list',
          name:'adslist',
          component: () => import('@/views/ad/adList.vue')
        },

        // 新建管理员页面
        {
          path:'/admin_users/creat',
          name:'adminusersdit',
          component: () => import('@/views/adminUser/adminUserEdit.vue')
        },
        // 新建管理员带id，新式写法，以前没用过，以前是通过params传参到这个页面，然后判断有无进行页面渲染
        {
          path:'/admin_users/creat/:id',
          name:'adminusers2',
          component: () => import('@/views/adminUser/adminUserEdit.vue'),props:true
        },
        // 管理员列表
        {
          path:'/admin_users/list',
          name:'adminuserslist',
          component: () => import('@/views/adminUser/adminUserList.vue')
        },
      ]
    }
  ]
})
