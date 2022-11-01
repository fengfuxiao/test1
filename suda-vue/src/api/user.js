import service from "../service"

// 登录
export const login = (user) => {
    return service({
        method: "POST",
        url: "/api/login",
        data: {
            u_username: user.username,
            u_password: user.password,
        }
    })
}
// 获取所有用户
export const getAllUser = () => {
    return service({
        method: "GET",
        url: "/api/getalluser",
    })
}
// 获取所有物流信息
export const getAllWuLiu = () => {
    return service({
        method: "GET",
        url: "/api/getallwuliu"
    })
}
// 获取所有网点信息
export const getAllNetPoint = () => {
    return service({
        method: "GET",
        url: "/api/getallnetpoint",
    })
}
// 获取用户访问来源
export const getUserAddress = () => {
    return service({
        method: "GET",
        url: "/api/getuseraddress",
    })
}
// 根据用户名获取用户
export const getUserByUsername = (params) => {
    return service({
        method: "GET",
        url: `/api/getuserbyusername?u_username=${params.u_username}`,
        // url: "/api/getuserbyusername"
        // params,
    })
}
// 更新用户信息
export const updateUserInfo  = (data) => {
    return service({
        method: "POST",
        url: "/api/updateuserinfo",
        data,
    })
}
// 删除用户
export const deleteUser = (id) => {
    return service({
        method: "POST",
        url: "/api/deleteuser",
        data: {
            u_id: id,
        }
    })
}
// 添加用户
export const insertUser = (data) => {
    return service({
        method: "POST",
        url: "/api/insertuser",
        data,
    })
}
// 改变角色
export const updateRole = (id) => {
    return service({
        method: "POST",
        url: "/api/updateRole",
        data: {
            u_id: id,
        }
    })
}