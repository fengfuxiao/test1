import axios from "axios"
import { setToken, getToken, removeToken } from "./utils/token"
import { Message } from 'element-ui'
import store from "./store/index"
import router from "./router/index"

const service = axios.create({
    baseURL: "http://localhost:3300",
    timeout: 3000,
})

// 添加请求拦截器
service.interceptors.request.use(config => {
    const tokenStr = getToken("token")
    // console.log("tokenstr=", tokenStr)
    if (tokenStr) {
        config.headers.token = tokenStr
    }
    // 请求之前获取并设置token
    return config
}, (error) => {
    return Promise.reject(error)
})
// 添加响应拦截器
service.interceptors.response.use(response => {
    // 根据不同的响应状态做出不同的反应
    // console.log("response=", response)
    let { status, message } = response.data
    if (status !== 0) {
        if(message === "身份认证失败") {
            store.commit("userModule/removeUser")
            router.push("/login")
        }
        Message({ message: message || "error", type: "warning" })
    }
    return response
}, (error) => {
    return Promise.reject(error)
})

export default service