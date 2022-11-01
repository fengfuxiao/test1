const db = require("../db/index")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config")

// 用户注册
exports.register = (req, res) => {
    const data = req.body
    // 判断该用户名是否已被占用
    // console.log(data.r_id)
    const sql = "select * from user where u_username=?"
    db.query(sql, [data.u_username], (err, results) => {
        if (err) return res.cc(err)
        if (results.length >= 1) return res.cc("用户名已被占用")
        // console.log("明文密码=", data.u_password)
        // 使用bcrypt对明文密码进行加密，随机盐长度为10
        data.u_password = bcrypt.hashSync(data.u_password, 10)
        // console.log("加密密码=", data.u_password)
        // console.log("加密密码长度=", data.u_password.length)
        // console.log("data=", data)
        const sqlIn = "insert into user set ?"
        // r_id：用户是的角色，默认为1普通用户，2位管理员
        db.query(sqlIn, { u_username: data.u_username, u_password: data.u_password, r_id: data.r_id, }, (err, resultsIn) => {
            if (err) return res.cc(err)
            if (resultsIn.affectedRows != 1) return res.cc("用户注册失败")
            res.cc("用户注册成功", 0)
        })
    })
}
// 用户登录
exports.login = (req, res) => {
    // 创建动态路由
    const routerList = []
    // 创建动态父路由
    const routerF = []
    // 创建子路由
    const routerC = []
    const data = req.body
    // console.log(data)
    const sql = "select * from user where u_username=?"
    // 判断用户是否存在
    db.query(sql, [data.u_username], (err, results) => {
        if (err) return res.cc(err)
        if (results.length <= 0) return res.cc("用户不存在")
        // 判断密码是否正确
        // 使用bcrypt解密，明文密码与用户输入的密码进行对比
        const isPwdCompare = bcrypt.compareSync(data.u_password, results[0].u_password)
        // console.log(isPwdCompare)
        // console.log("pwd=", data.u_password)
        // console.log("mysqlpwd=", results[0].u_password)
        if (!isPwdCompare) {
            return res.cc("用户名或密码错误")
        }
        // 判断用户是普通用户还是管理员
        const sqlSelType = "select r_id from user where u_username=?"
        db.query(sqlSelType, [data.u_username], (err, resultsST) => {
            if (err) return res.cc(err)
            if (resultsST.length != 1) return res.cc("查询失败")
            // 查询用户对应的权限
            /**
             * 1、查询用户的角色id
             *      select r_id from user where u_username=?
             * 2、查询该角色id对应的权限id
             *      select p_id from role_permission where r_id=(select r_id from user where u_username=?)
             * 3、查询权限id对应的数据
             *      select * from permission where p_id=(select p_id from role_permission where r_id=(select r_id from user where u_username=?));
             */
            const sqlSelPer = "select * from permission where p_id in (select p_id from role_permission where r_id=(select r_id from user where u_username=?))"
            db.query(sqlSelPer, [data.u_username], (err, resultsSP) => {
                if (err) return res.cc(err)
                // 把路由组合成一个完整的带有children的完整路由
                resultsSP.forEach(item => {
                    // console.log("item==", item)
                    // 要能展示的路由组件，isShow为1的
                    if (item.isShow == 1) {
                        // 寻找有父级路由的路由
                        if (item.father_id) {
                            // console.log("有父路由=", item)
                            routerC.push(item)
                        } else {
                            // console.log("有子路由=", item)
                            routerF.push(item)
                        }
                    }
                })
                // console.log("父路由==", routerF)
                // console.log("子路由==", routerC)
                // 遍历父路由
                routerF.forEach(item => {
                    // 创建父路由的children
                    // console.log("item=", item)
                    const ch = []
                    // 遍历子路由
                    routerC.forEach(i => {
                        if (item.p_id === i.father_id) {
                            ch.push(i)
                        }
                    })
                    const r = {
                        ...item,
                        children: ch
                    }
                    // console.log("r=", r)
                    routerList.push(r)
                })
                // console.log(results)
                const user = {
                    id: results[0].u_id,
                    username: data.u_username,
                    nickname: results[0].u_nickname,
                    age: results[0].u_age,
                    gender: results[0].u_gender,
                    address: results[0].u_address,
                    avatar: results[0].u_avatar,
                    r_id: results[0].r_id,
                    routes: routerList
                }
                // sd.format(new Date(), 'YYYY-MM-DD HH:mm');
                // console.log("user===", user)
                const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
                res.send({
                    status: 0,
                    msg: "登录成功",
                    token: "Bearer " + tokenStr,
                })
            })
        })
    })
}
// 获取所有用户
exports.getAllUser = (req, res) => {
    const sql = "select * from user"
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        if (results.length < 0) return res.cc("获取用户信息失败")
        const users = []
        results.forEach(item => {
            users.push({...item, u_password: ""})
        })
        // console.log(users)
        res.cc("获取所有用户信息成功", 0, {
            user: users,// 用户信息
            count: results.length// 用户数量
        })
    })
}
// 获取所有物流信息
exports.getAllWuLiu = (req, res) => {
    const sql = "select * from wuliu_info"
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        if (results.length < 0) return res.cc("获取物流信息失败")
        res.cc("获取物流信息成功", 0, {
            wuliu: results,// 物流信息
            count: results.length// 物流数量
        })
    })
}
// 获取所有网点信息
exports.getAllNetPoint = (req, res) => {
    const sql = "select * from net_point"
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        if (results.length < 0) return res.cc("获取网点信息失败")
        res.cc("获取网点信息成功", 0, {
            netpoint: results,// 网点信息
            count: results.length// 网点数量
        })
    })
}
// 获取用户访问来源
exports.getUserAddress = (req, res) => {
    const sql = "select u_address as name, count(u_address) as value from user group by u_address"
    db.query(sql, [], (err, results) => {
        if(err) return res.cc(err)
        if(results.length < 0) return res.cc("获取用户访问来源失败")
        res.cc("获取访问来源成功", 0, results)
    })
}
// 根据用户名查询用户
exports.getUserByUsername = (req, res) => {
    const data = req.query
    // console.log("data=", data)
    const sql = "select * from user where u_username=?"
    db.query(sql, [data.u_username], (err, results) => {
        if(err) return res.cc(err)
        if(results.length < 0) return res.cc("查询失败")
        // console.log("res=", results[0])
        const user = []
        if(results.length == 0) return res.send({ status: 1, message: "未查到该用户", user: user, })
        user.push({...results[0], u_password: ""})
        // console.log("user=", user)
        res.send({
            status: 0,
            message: "查询成功",
            user: user,
            count: user.length,
        })
    })
}
// 更新用户信息
exports.updateUserInfo = (req, res) => {
    const data = req.body
    // console.log("data=", data)
    const sql = "update user set ? where u_id=?"
    db.query(sql, [data, data.u_id], (err, results) => {
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc("更新失败")
        res.cc("更新成功", 0)
    })
}
// 删除用户
exports.deleteUser = (req, res) => {
    const data = req.body
    // console.log("data=", data)
    const sql = "delete from user where u_id=?"
    db.query(sql, [data.u_id], (err, results) => {
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc("删除用户失败")
        return res.cc("删除用户成功", 0)
    })
}
// 添加用户
exports.insertUser = (req, res) => {
    const data = req.body
    // console.log("data=", data)
    // 判断该用户名是否已存在
    const sqlSel = "select * from user where u_username=?"
    db.query(sqlSel, [data.u_username], (err, resultsS) => {
        if(err) return res.cc(err)
        if(resultsS.length !== 0) return res.cc("用户名已存在")
        data.u_password = bcrypt.hashSync(data.u_password, 10)
        // const sql = "insert into user(u_username,u_password,u_nickname,u_age,u_gender,u_address,u_avatar,r_id) set ?"
        const sql = "insert into user set ?"
        db.query(sql, {u_username: data.u_username,u_password: data.u_password,u_nickname: data.u_nickname,u_age: data.u_age,u_gender: data.u_gender,u_address: data.u_address,u_avatar: data.u_avatar,r_id: data.r_id}, (err, results) => {
            if(err) return res.cc(err)
            if(results.affectedRows !== 1) return res.cc("新增用户失败")
            // console.log("results=", results)
            // 把新增的用户返回给客户端
            const sqlSNU = "select * from user where u_username=?"
            db.query(sqlSNU, [data.u_username], (err, resultsSNU) => {
                if(err) return res.cc(err)
                if(resultsSNU.length !== 1) return res.cc("查找失败")
                // console.log("re=", resultsSNU)
                res.cc("用户添加成功", 0, resultsSNU[0])
            })
        })
    })
}
// 变更角色
exports.updateRole = (req, res) => {
    const data = req.body
    // console.log("data=", data)
    const sql = "select r_id from user where u_id=?"
    db.query(sql, [data.u_id], (err, results) => {
        if(err) return res.cc(err)
        if(results.length < 0) return res.cc("获取该用户信息失败")
        let i = results[0].r_id === 1 ? 2 : 1
        // console.log(i)
        const sqlUR = "update user set r_id=? where u_id=?"
        db.query(sqlUR, [i, data.u_id], (err, resultsUR) => {
            if(err) return res.cc(err)
            if(resultsUR.affectedRows === 0) return res.cc("更该用户角色失败")
            res.cc("更该角色成功", 0, data)
        })
    })
}