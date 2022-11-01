# 物流管理

## 数据库

- 用户表：user
  - u_id：用户id、自增、主键
  - u_username：用户名，必填，不可重复
  - u_password：密码，必填
  - u_nickname：用户昵称
  - u_age：用户年龄
  - u_gender：用户性别
  - u_address：用户地址
  - u_type：值为1或2，1表示普通用户、2表示管理员，默认1
- 角色表：role
  - r_id：角色id、自增、主键
  - r_name：角色名称
  - r_desc：角色介绍
- 权限表：permission
  - p_id：权限id、自增、主键
  - p_name：权限名称
  - p_url：动态路由
- 角色-权限表：role_permission
  - r_id：角色id
  - p_id：权限id
  - rp_description：描述信息
- 用户-角色表：user_role（删）
  - ur_id：用户角色id
  - u_id：用户id
  - r_id：角色id
- 工单表：work_order
  - wo_id：工单id
  - wo_company：工单所属快递公司
  - wo_problem：是什么（问题）导致了工单的产生。例如：物品损坏等
  - wo_gjr：谁在跟此票快件(快递员、客服)
  - wo_starttime：工单产生的时间
  - wo_promisetime：预计什么时间处理完成
  - wi_id：出问题物品的运单id
- 物流信息表：wuliu_info
  - wi_id：物品id
  - wi_number：运单单号
  - wi_sender：寄件人
  - wi_sender_phone：寄件人电话
  - wi_sender_address寄件地址
  - wi_recipient：收件人
  - wi_recipient_phonne：收件人电话
  - wi_recipient_address：收件地址
  - wi_count：件数
  - wi_weight：重量
  - wi_description：物品描述
  - wi_starttime：发货时间
  - d_id：配送员id
- 网点表：net_point
  - p_id：网点id
  - p_name：网点名称
  - p_address：网点地址
  - p_phone：网点联系电话
  - p_area：网点负责的配送区域
- 配送员表：deliveryman
  - d_id：配送员id
  - d_name：配送员姓名
  - d_phone：配送员电话
  - d_area：配送员负责配送的区域
  - p_id：配送员所属网点id
- 公告表：announcement
  - a_id：公告id
  - a_manager_id：发布公告的管理员id
  - a_issuetime：公告发布时间
  - a_content：公告内容

- 客服表：custom_service
  - cs_id：客服id
  - cs_name：客服姓名
  - wo_id：客服处理的工单id



### 管理员

- 登录：/login
- 注册：/register
- 管理：
  - 用户信息：/main/user

- 订单
  - 查询订单：/main/searchorder


### 用户

- 登录
- 注册
- 订单
  - 查询订单


## 前端路由

### 首页



### 物流管理（取消）

- 货物信息

### 订单

- 订单分配
- 订单查询

### 货物运输（用户）

- 运输中
- 已送达
- 已签收

### 用户管理（管理员）

- 用户信息

## 权限管理

### 旧思路

思路：后端通过多表查询获取登录用户对应的权限和动态路由，前端把获取到的用户信息包括动态路由存储到vuex和浏览器存储token中。

- 通过后端接口返回不同类型用户对应的权限

  - 后端相关代码：

    ```js
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
      // console.log("resultsSP=", resultsSP)
      res.cc("登录成功", 0, {
        r_id: results[0].r_id,
        per: resultsSP
      })
    })
    ```

  - 前端相关代码：

    ```js
    const { options } = this.$router;
    const routes = options.routes;
    routes.filter((item) => {
      // 如果路由需要展示
      if (item.meta.isShow) {
        // 导入多级路由
        if (item.children) {
          // 遍历子路由
          item.children.forEach((i) => {
            this.perPath = item.path + "/" + i.path;
            // 把与后端获取到的动态路由相等的导入菜单路由中
            this.user.per.forEach((userItem) => {
              // 由于多个子路由会多次遍历，多次添加，所以要判断是否已经添加过了
              if(this.routeList.indexOf(item) == -1) {
                userItem.p_url === this.perPath ? this.routeList.push(item) : ""
              }
            });
          });
        } else {
          // 导入一级路由
          this.routeList.push(item);
        }
      }
    });
    ```



### 新思路

后端把权限路由的完整数据响应给客户端

数据格式：

```json
exp: 1666186670
iat: 1666150670
routes: [
  {
    component: "/Main.vue"
    father_id: null
    icon: "fa fa-users"
    isShow: 1
    name: "User"
    p_id: 20
    path: "/main"
    title: "用户"
    children: [
      {
        component: "/user/UserInfo.vue"
        father_id: 20
        icon: "fa fa-genderless"
        isShow: 1
        name: "UserInfo"
        p_id: 3
        path: "user"
        title: "用户信息"
      }
    ]
  }
]
username: "WangMin"
```

注意：router.options中打印不出动态路由

未成功的思路：

1. 前端登录触发login方法，从服务器端获取用户token数据
2. 把token数据解析成明文数据，并存储到vuex中
3. 创建动态路由
4. 从vuex中获取动态路由数据
5. 把动态路由push到routes中

成功后的思路：

1. 定义动态权限路由permission.js文件
2. 把从后端获取到的路由调用permission.js中的dynamicRouter方法，能获取到正确格式的前端路由
3. 在router下的index.js中定义全局前置守卫路由
   1. 现判断用户是否登录：vuex中user信息和浏览器内存中用户信息是否为空
      1. 同时为空：说明未登录，应该跳转到登录页面
   2. 如果vuex中的信息为空，而浏览器内存的用户信息存在，说明已经登录过了，不需要再重新登录
      1. 就直接把浏览器内存的用户token信息，添加到vuex中，同时跳转路由到首页
   3. 如果vuex和浏览器内存的信息都不为空，说明用户已经登录需要把动态路由添加到router上，注意要加一个判断isRouter，默认为false，是否已经添加了动态路由，再添加完毕之后要把值设为true，如果不加终端会无限循环报错或警告

代码实现：

permission.js

```js
export const dynamicRouter = (routerList) => {
  // 动态添加路由
  const rList = []
  let ch = []
  routerList.forEach(r => {
    // 添加需要显示的路由
    if (r.isShow == 1) {
      // 添加多级路由
      if (r.children.length !== 0) {
        r.children.forEach(i => {
          if (r.p_id === i.father_id) {
            ch.push({
              path: i.path,
              name: i.name,
              component: resolve => require([`@/view${i.component}`], resolve),
              meta: {
                title: i.title,
                icon: i.icon,
                isShow: i.isShow === 1 ? true : false
              }
            })
          }
        })
        rList.push({
          path: r.path,
          name: r.name,
          component: resolve => require([`@/view${r.component}`], resolve),
          meta: {
            title: r.title,
            icon: r.icon,
            isShow: r.isShow == 1 ? true : false,
          },
          children: ch,
        })
        ch = []
      } else {
        // 添加一级路由
        rList.push({
          path: r.path,
          name: r.name,
          component: resolve => require([`@/view${r.component}`], resolve),
          meta: {
            title: r.title,
            icon: r.icon,
            isShow: r.isShow == 1 ? true : false,
            test: true,
          },
        })
      }
    }
  })
  return rList
}
```

全局前置路由：

```js
// 判断是否已经添加了动态路由
let isRouter = false

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  const token = getToken("token")
  // 未登录
  if (!store.state.userModule.token && !token) {
    // 判断当前操作是否是跳转到登录页面
    if (to.path === "/login") {
      next()
    }
    else {
      next("/login")
    }
  } else if (!store.state.userModule.token && token) {
    // 已经登录，但是vuex中因为页面刷新数据消失
    // 把信息存储到vuex中
    store.commit("userModule/setUser", token)
    // 直接跳转到首页
    next("/main")
  } else {
    // 已登录
    // 还没添加动态权限路由
    if (!isRouter) {
      console.log("已登录")
      store.state.userModule.user.routerList.forEach(item => {
        routes.push(item)
        router.addRoute(item)
      })
      isRouter = true
      next("/main")
    }
    // 已经添加了动态路由
    next()
  }
})
```





## 后端

### 密码加密

用户密码存储到数据库中不是明文密码，使用bcrypt加密后存储到数据库

1. 安装bcryptjs：su

   ```js
   yarn add bcryptjs@2.4.3
   ```

2. 在路由函数模块中导入：

   ```js
   const bcrypt = require("bcryptjs")
   ```

3. 用户注册时，对密码进行加密再存到数据库：

   ```js
   const data = req.body
   // bcrypt.hashSync(明文密码, 随机盐长度)
   data.u_password = bcrypt.hashSync(data.u_password, 10)
   ```

4. 用户登录时，判断密码是否正确：

   ```js
   // bcrypt.compareSync(明文密码, 数据库中加密的密码)，返回值为布尔值
   const isPwdCompare = bcrypt.compareSync(data.u_password, results[0].u_password)
   if(!isPwdCompare) {
     return res.cc("用户名或密码错误")
   }
   ```

### 用户数据token存储

用户登录成功之后，把数据存储到浏览器的token中

1. 安装jsonwebtoken用来生成token字符串，安装express-jwt用来解析token字符串

   ```js
   yarn add jsonwebtoken express-jwt
   ```

2. 在项目根目录创建config.js文件，用来定义全局配置，这里用来定义加密和解密的token字符串的密钥和token的有效期

   ```js
   // 全局配置
   module.exports = {
     // 定义加密和解密token的密钥
     jwtSecretKey: "FengFX is ^_^!",
     // 定义token的有效期
     expiresIn: "10h",
   }
   ```

3. 在路由函数模块中导入jsonwebtoken用来生成token字符串，导入config.js配置文件，注意token字符串不能包含用户的敏感信息（密码等）

   ```js
   const jwt = require("jsonwebtoken")
   const config = require("../config")
   ```

4. 把用户信息存储起来然后生成对应的token字符串

   ```js
   // 把用户信息存储到user中，但注意不要包含敏感信息
   const user = { ...results[0], u_password: "", u_address: "", per: resultsSP }
   // 生成user的token字符串，jwt.sign(要生成字符串的数据, 加密的密钥, { expiresIn: token字符串的有效期 })
   const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
   // 把登录成功的信息和用户的token响应给客户端
   res.cc("登录成功", 0, { token: "Bearer " + tokenStr })
   ```

5. 在app.js中全局配置解析token字符串的中间件

   1. 导入express-jwt和config

      ```js
      const expressJwt = require("express-jwt")
      const config = require("./config")
      ```

   2. 配置解析token字符串的全局中间件

      ```js
      // 需要身份认证的接口需要在请求头中加入：Authorization属性，值为token字符串
      // 配置完身份认证后，会自动根据请求头中的Authorization的值匹配对应的用户信息保存到req.user中
      // 配置解析token字符串的中间件，.unless中是不需要身份认证的路径
      app.use(expressJwt({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
      ```

      

   

## 前端

### 避免用户重复登录

- 问题：当用户之前已经登录过而且存在浏览器里的token还未失效，那用户就不需要再重新登录解析token

- 解决方法：在router的index.js中加入全局路由守卫：

  ```js
  // 全局前置路由守卫
  router.beforeEach((to, from, next) => {
    // 判断浏览器中是否有用户的token
    const token = getToken("token")
    // console.log(!token)
    // 如果没有token，或token为空
    if(!token) {
      // console.log("用户未登录")
      // 如果跳转路径不是/login，则跳转到登录页面
      if(to.path != "/login") {
        next("/login")
      }
      // 如果跳转到登录页面，则放行
      next()
    } else {
      // console.log("用户已登录")
      // 如果用户已经登录，浏览器内存已经有用户的token信息，则不需要重新登录，只需要把token重新解析一边就行
      store.commit("userModule/setUser", token)
      next()
    }
  })
  ```


### element-ui中下拉菜单

- 问题el-dropdown中的el-dropdown-item的点击事件一直触发不了
- 解决：@click="onLogout"改为：@click.native="onLogout"改为原生的点击事件即可

### 当用户退出登录后强制刷新

用户退出登录之后，应该把浏览器中的token清空，并强制刷新，让用户重新登录
```js
// 让页面强制刷新
location.reload();
```



## 遇到的问题

1. 后端加密密码后的长度被joi校验检测出密码长度过长，不应该会检测出，joi应该只检测用户在输入行中输入的数据 ，而加密后的密码是，检测用户输入的数据成功之后的操作。
   1. 已解决：数据库的密码长度设置的太短
2. 权限管理时，后端使用db.query和forEach，forEach把db.query包裹起来，不能res响应，否则会报多个响应的错误。db.query是异步，这两个同时使用时，添加的数据，在外获取为空
   1. 已解决：别让forEach循环包裹db.query，创建子路由和父路由，赋值，然后循环便利操作

3. 生动动态路由点击登录按钮，跳转到首页，结果获取不到首页组件的信息，显示为组件为default
   1. 未解决





修改用户图片，应该是什么格式保存到数据库




# 参考项目

火云快递管理系统：http://test.hyuusoft.com/#/dashboard
