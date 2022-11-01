// 用户私人路由函数模块
const db = require("../db/index")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config")

// 获取登录用户信息
exports.getUserInfo = (req, res) => {
    res.cc("OK", 0)
}
// 修改用户个人信息
exports.updateUserInfo = (req, res) => {
    res.cc("OK")
}
// 获取所有公告
exports.getAllAnnouncement = (req, res) => {
    const user = req.user
    console.log("user=", user)
    const sql = "select * from announcement"
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        if (results.length < 0) return res.cc("获取公告信息失败")
        res.cc("获取公告信息成功", 0, {
            announcement: results,// 公告信息
            count: results.length// 公告数量
        })
    })
}