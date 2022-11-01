const express = require("express")
const router = express.Router()
const router_handler = require("../router_handler/user")
const expressJoi = require("@escook/express-joi")
const { reg_login_schema } = require("../schema/user")

// 用户注册
router.post("/register", expressJoi(reg_login_schema), router_handler.register)
// 用户登录
router.post("/login", expressJoi(reg_login_schema), router_handler.login)
// 获取所有用户
router.get("/getalluser", router_handler.getAllUser)
// 获取用户访问来源
router.get("/getuseraddress", router_handler.getUserAddress)
// 根据用户名查询用户
router.get("/getuserbyusername", router_handler.getUserByUsername)
// 更新用户信息
router.post("/updateuserinfo", router_handler.updateUserInfo)
// 删除用户
router.post("/deleteuser", router_handler.deleteUser)
// 添加用户
router.post("/insertuser", router_handler.insertUser)
// 更该角色
router.post("/updaterole", router_handler.updateRole)

// 获取所有物流
router.get("/getallwuliu", router_handler.getAllWuLiu)

// 获取所有网点信息
router.get("/getallnetpoint", router_handler.getAllNetPoint)

module.exports = router