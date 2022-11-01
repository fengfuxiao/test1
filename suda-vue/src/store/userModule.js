import { getToken, setToken, removeToken } from "../utils/token"
import jwtDecode from 'jwt-decode'
import { dynamicRouter } from '../router/permission'

export default {
    namespaced: true,
    state: {
        // 当前登录的用户信息
        user: {
            id: 0,// 用户id
            username: "",// 用户名
            nickname: "",// 昵称
            age: 0,// 年龄
            gender: "",// 性别
            address: "",// 地址
            r_id: 0,// 角色id
            avatar: "",// 头像
            routerList: [],// 权限路由列表
        },
        token: "",
    },
    actions: {
    },
    mutations: {
        setUser(state, value) {
            const tokenStr = jwtDecode(value)
            state.user = {
                id: tokenStr.id,// 用户id
                username: tokenStr.username,// 用户名
                nickname: tokenStr.nickname,// 昵称
                age: tokenStr.age,// 年龄
                gender: tokenStr.gender,// 性别
                address: tokenStr.address,// 地址
                r_id: tokenStr.r_id,// 角色id
                avatar: tokenStr.avatar,// 头像
                routerList: [],// 权限路由列表
            }
            // console.log("tokenStrppppp====", tokenStr)
            const routerList = dynamicRouter(tokenStr.routes)
            state.token = value
            state.user.routerList.push(...routerList)
            // console.log("routerlist===", state.user.routerList)
            setToken("username", state.user.username)
            setToken("token", state.token)
        },
        getUser(state, value) {
            getToken(value)
        },
        removeUser(state, value) {
            removeToken("username")
            removeToken("token")
        }
    },
}