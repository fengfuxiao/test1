const express = require("express")
const app = express()
const cors = require("cors")
const userRouter = require("./router/user")
const myRouter = require("./router/my")
const announcementRouter = require("./router/announcement")
const Joi = require('joi')
const expressJwt = require("express-jwt")
const config = require("./config")

// 解决跨域
app.use(cors())
// 解析body中json和表单格式数据
// app.use(bodyParser.json())// 已弃用
// app.use(bodyParser.urlencoded({ extended: false }))// 已弃用
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 配置中间件
app.use((req, res, next) => {
    // 优化代码res.send()中间件
    res.cc = (err, status=1, data) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
            data
        })
    }
    next()
})

// 配置解析token字符串的中间件，.unless中是不需要身份认证的路径
app.use(expressJwt({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

// 导入user路由模块
app.use("/api", userRouter)
// 导入my路由模块
app.use("/my", myRouter)
// 导入公告announcement路由模块
app.use("/announcement", announcementRouter)

// 错误中间件
app.use((err, req, res, next) => {
    // Joi校验失败
    if(err instanceof Joi.ValidationError) return res.cc(err)
    // 身份认证失败
    if(err.name === "UnauthorizedError") return res.cc("身份认证失败")
    // 如果错误原因是其他
    res.cc(err)
    next()
})

app.listen(3300, () => {
    console.log("server running:http://localhost:3300")
})