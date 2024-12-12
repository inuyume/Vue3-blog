/* jshint esversion: 11 */
/* jshint strict: false */
import {createRouter,createWebHistory,createWebHashHistory} from "vue-router";
const routes = [
    {
        path:"/",
        component:() => import('../views/index.vue')
    },
    {
        path: "/admin",
        component:() => import('../views/admin.vue'),
        children: [
            {
                path: 'system/write-blog',
                component: () => import("../views/WriteBlog.vue")
            },{
                path: 'system/edit-blog',
                component: () => import("../views/BlogEdit.vue")
            },{
                path: "/admin/system/articles",
                component: () => import('../views/articlesList.vue')
            }
        ],
        meta: { requiresAuth: true } // 添加meta字段标记需要认证
    },
    {
        path: "/login",
        component:() => import('../views/login.vue')
    },{
        path: "/login/register",
        component:() => import('../views/register.vue')
    },{
        path: '/blog/:id',
        component: () => import('../views/BlogDetail.vue'),
        props: true
    },
];
const router = createRouter({
    history:createWebHashHistory(),
    routes
});

// 全局导航守卫 - 认证检查
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const token = localStorage.getItem('jwtToken');

    if (requiresAuth && !token) {
        next('/login'); // 如果没有JWT，重定向到登录页面
    } else {
        next(); // 如果有JWT或者不需要认证，继续导航
    }
});

export default router;