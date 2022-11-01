//静态路由
//#region 
/**
 * {
        path: "/main",
        name: "Main",
        component: () => import("../view/Main.vue"),
        meta: {
            title: "首页",
            isShow: true,
        }
    },
    {
        path: "/main",
        name: "Main",
        component: () => import("../view/Main.vue"),
        meta: {
            title: "首页",
            icon: "fa fa-home",
            isShow: true,
        },
    },
    // 用户管理
    {
        path: "/main",
        name: "User",
        component: () => import("../view/Main.vue"),
        meta: {
            title: "用户",
            icon: "fa fa-users",
            isShow: true,
        },
        children: [
            {
                path: "user",
                name: "UserInfo",
                component: () => import("../view/user/UserInfo.vue"),
                meta: {
                    title: "用户信息",
                    icon: "fa fa-genderless",
                    isShow: true,
                }
            }
        ]
    },
    // 订单信息
    {
        path: "/main",
        name: "Order",
        component: () => import("../view/Main.vue"),
        meta: {
            title: "订单",
            icon: "fa fa-list-alt",
            isShow: true,
        },
        children: [
            {
                path: "searchorder",
                name: "SearchOrder",
                component: () => import("../view/order/SearchOrder.vue"),
                meta: {
                    title: "订单查询",
                    icon: "fa fa-genderless",
                    isShow: true,
                }
            }
        ]
    },
    // 权限管理
    {
        path: "/main",
        name: "Permission",
        component: () => import("../view/Main.vue"),
        meta: {
            isShow: true,
            title: "权限",
            icon: "fa fa-key"
        },
        children: [
            {
                path: "permissionmanager",
                name: "PermissionManager",
                component: () => import("../view/permission/PermissionManager.vue"),
                meta: {
                    isShow: true,
                    title: "权限管理",
                    icon: "fa fa-genderless",
                },
            },
            {
                path: "addpermission",
                name: "AddPermission",
                component: () => import("../view/permission/AddPermission.vue"),
                meta: {
                    isShow: true,
                    title: "添加权限",
                    icon: "fa fa-genderless",
                },
            }
        ]
    },
    // 角色管理
    {
        path: "/main",
        name: "Role",
        component: () => import("../view/Main.vue"),
        meta: {
            isShow: true,
            title: "角色",
            icon: "fa fa-user-o",
        },
        children: [
            {
                path: "changerole",
                name: "ChangeRole",
                component: () => import("../view/role/ChangeRole.vue"),
                meta: {
                    isShow: true,
                    title: "变更角色",
                    icon: "fa fa-genderless",
                }
            }
        ]
    },
    // 公告管理
    {
        path: "/main",
        name: "Announcement",
        component: () => import("../view/Main.vue"),
        meta: {
            isShow: true,
            title: "公告",
            icon: "fa fa-bullhorn",
        },
        children: [
            {
                path: "lookannouncement",
                name: "LookAnnouncement",
                component: () => import("../view/announcement/LookAnnouncement.vue"),
                meta: {
                    isShow: true,
                    title: "查看公告",
                    icon: "fa fa-genderless",
                },
            },
            {
                path: "issueannouncement",
                name: "IssueAnnouncement",
                component: () => import("../view/announcement/IssueAnnouncement.vue"),
                meta: {
                    isShow: true,
                    title: "发布公告",
                    icon: "fa fa-genderless",
                },
            },
        ]
    },
    // 个人管理
    {
        path: "/main",
        name: "Personal",
        component: () => import("../view/Main.vue"),
        meta: {
            isShow: true,
            title: "个人",
            icon: "fa fa-address-card",
        },
        children: [
            {
                path: "personalmessage",
                name: "PersonalMessage",
                component: () => import("../view/personal/PersonalMessage.vue"),
                meta: {
                    isShow: true,
                    title: "个人信息",
                    icon: "fa fa-genderless",
                }
            }
        ]
    }
 */
//#endregion