import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import changePass from '../views/changePass.vue'
import goodInfoManage from '../views/goodInfoManage.vue'
import orderManage from '../views/orderManage.vue'
import feedback from '../views/feedback.vue'
import login from '../views/Login.vue'
Vue.use(VueRouter)

const routes = [
    { path: '/', name: '登陆', component: login },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [
            { name: '商品信息管理', path: '/goodInfoManage', component: goodInfoManage },
            { name: '订单管理', path: '/orderManage', component: orderManage },
            { name: '修改密码', path: '/changePass', component: changePass },
            { name: '用户反馈管理', path: '/feedback', component: feedback },

        ]
    }
]

const router = new VueRouter({
    routes
})

export default router