// 用户登录成功之后的私人路由模块
const express = require("express")
const router = express.Router()
const router_handler = require("../router_handler/my")

// 获取登录的用户信息
router.get("/getuserinfo", router_handler.getUserInfo)
// 修改用户个人信息
router.post("/updateuserinfo", router_handler.updateUserInfo)
// 获取所有公告
router.get("/getallannouncement", router_handler.getAllAnnouncement)

module.exports = router