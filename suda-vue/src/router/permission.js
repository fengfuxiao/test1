export const dynamicRouter = (routerList) => {
    // 动态添加路由
    // console.log("routerList==", routerList)
    const rList = []
    let ch = []
    routerList.forEach(r => {
        // console.log(r)
        // 添加需要显示的路由
        if (r.isShow == 1) {
            // 添加多级路由
            if (r.children.length !== 0) {
                r.children.forEach(i => {
                    // console.log("i", i)
                    // console.log("icomponent===" + r)
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
                    // component: resolve => require([`@/viewMain.vue`], resolve),
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
    // rList.push({
    //     path: "/main",
    //     name: "Main",
    //     component: () => import("../view/Main.vue"),
    //     meta: {
    //         title: "首页",
    //         icon: "fa fa-home-o",
    //         isShow: 1,
    //     }
    // })
    // console.log("dynamicRouter---==", rList)
    return rList
}