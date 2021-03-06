import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
import songListsDetail from '@/view/songListsDetail'
import listen from '@/view/listen'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: index
    }, {
        path: '/songListsDetail',
        name: 'songListsDetail',
        component: songListsDetail
    }, {
        path: '/listen',
        name: 'listen',
        component: listen
    }]
})