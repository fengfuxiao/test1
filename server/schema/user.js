// 表单验证规则

const Joi = require("joi")

const username = Joi.string().alphanum().min(2).max(12).required()
const password = Joi.string().pattern(/^[\S]{6,15}$/).required()
const type = Joi.number()

// 用户登录注册校验
exports.reg_login_schema = {
    body: {
        u_username: username,
        u_password: password,
        r_id: type,
    }
}
// 删除用户校验
exports.del_schema = {
    body: {
        u_username: username,
    }
}