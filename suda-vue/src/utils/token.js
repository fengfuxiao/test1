// 存储token
export const setToken = (tokenKey, token) => {
    return localStorage.setItem(tokenKey, token)
}
// 获取token
export const getToken = (tokenKey) => {
    return localStorage.getItem(tokenKey)
}
// 删除token
export const removeToken = (tokenKey) => {
    return localStorage.removeItem(tokenKey)
}