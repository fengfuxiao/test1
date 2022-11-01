import Vue from "vue"
import VueRouter from "vue-router"
import { getToken } from "../utils/token"
import store from "../store/index"

Vue.use(VueRouter)

// 默认路由
const routes = [
    // {
    //     path: "/",
    //     redirect: "/login",
    //     meta: {
    //         title: "默认",
    //         isShow: false,
    //     }
    // },
    {
        path: "/login",
        name: "Login",
        component: () => import("../view/login/Login.vue"),
        meta: {
            title: "登录",
            isShow: false,
        }
    },
]

const router = new VueRouter({
    mode: "history",
    routes,
})

// 判断是否已经添加了动态路由
let isRouter = false

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
    // console.log("token==", token)
    const token = getToken("token")
    // console.log("user==", user)
    // 未登录
    if (!store.state.userModule.token && !token) {
        // 判断当前操作是否是跳转到登录页面
        if (to.path === "/login") {
            // console.log("未登录，去登录页面")
            next()
        }
        else {
            // console.log("未登录，强制去登录页面")
            next("/login")
        }
    } else if (!store.state.userModule.token && token) {
        // 已经登录，但是vuex中因为页面刷新数据消失
        // console.log("已登录，但是vuex中没有信息，token出存在浏览器中")
        // 把信息存储到vuex中
        store.commit("userModule/setUser", token)
        const toPath = to.path
        // 如果是在主页跳转，刷新页面之后还在改页面
        if (toPath.slice(1, 5) === "main") {
            next(to.path)
        } else {
            // 直接跳转到首页
            next("/main")
        }
    } else {
        // 已登录
        // 还没添加动态权限路由
        if (!isRouter) {
            // console.log("已登录")
            store.state.userModule.user.routerList.forEach(item => {
                routes.push(item)
                // console.log("routes=", routes)
                router.addRoute(item)
            })
            isRouter = true
            const toPath = to.path
            // 如果是在主页跳转，刷新页面之后还在改页面
            if (toPath.slice(1, 5) === "main") {
                next(to.path)
            } else {
                // 直接跳转到首页
                next("/main")
            }
        }
        // 已经添加了动态路由
        // console.log("已经添加了动态路由")
        next()
    }
})

const originalPush = VueRouter.prototype.push
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

export default router