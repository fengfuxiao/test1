const express = require("express")
const router = express.Router()
const router_handler = require("../router_handler/announcement.js")


// 获取所有公告
router.get("/getallannouncement", router_handler.getAllAnnouncement)
// 根据公告ID删除公告
router.post("/deleteannouncementbyid", router_handler.deleteAnnouncementById)
// 发布公告
router.post("/addannouncement", router_handler.addAnnouncement)

module.exports = router