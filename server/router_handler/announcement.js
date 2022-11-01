const db = require("../db/index")
const moment = require("moment")

// 获取所有公告
exports.getAllAnnouncement = (req, res) => {
    // const user = req.user
    // console.log("user=", user)
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
// 根据公告ID删除公告
exports.deleteAnnouncementById = (req, res) => {
    const data = req.body
    // console.log("data=", data)
    const sql = "delete from announcement where a_id=?"
    db.query(sql, [data.a_id], (err, results) => {
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc("删除公告失败")
        res.cc("删除公告成功", 0)
    })
}
// 发布(新增)公告
exports.addAnnouncement = (req, res) => {
    const data = req.body
    if(!data.a_title || !data.a_content) return res.cc("内容不能为空")
    // console.log("data=", data)
    const user = req.user
    // console.log("user=", req.user)
    const nowtime = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    // console.log("现在时间：", nowtime)
    const announcement = {
        a_manager_id: user.id,
        a_manager_name: user.username,
        a_issuetime: nowtime,
        a_title: data.a_title,
        a_content: data.a_content,
        a_isrequire: data.a_isrequire,
    }
    const sql = "insert into announcement set ?"
    db.query(sql, { a_manager_id: announcement.a_manager_id, a_manager_name: announcement.a_manager_name, a_issuetime: announcement.a_issuetime, a_title: announcement.a_title, a_content: announcement.a_content, a_isrequire: announcement.a_isrequire }, (err, results) => {
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc("发布公告失败")
        res.cc("发布公告成功", 0)
    })
}