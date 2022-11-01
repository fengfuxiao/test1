<!-- @format -->

<template>
  <div class="aside">
    <el-scrollbar>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        mode="vertical"
        :active-text-color="activeTextColor"
        :router="true"
      >
        <!-- 
          :unique-opened="true"
          active-text-color="#409eff"
         -->
        <div class="aside-logo">
          <i class="changebtn el-icon-platform-eleme" @click="changeAside"></i>
          <span class="logo-title" v-show="!isCollapse">NDT物流</span>
        </div>

        <!-- 一级路由 -->
        <el-menu-item
          v-for="(noChild, index) in routeNotChildList"
          :key="index"
          :index="noChild.path"
        >
          <i :class="noChild.meta.icon" class="aside-route-icon"></i>
          <span class="aside-route-title" slot="title">{{
            noChild.meta.title
          }}</span>
        </el-menu-item>

        <!-- 多级路由 -->
        <el-submenu
          v-for="(child, index) in routeChildList"
          :key="index + 1 + '-f'"
          :index="index + ''"
        >
          <template slot="title">
            <i :class="child.meta.icon" class="aside-route-icon"></i>
            <span class="aside-route-title" slot="title">{{
              child.meta.title
            }}</span>
          </template>
          <el-menu-item
            v-for="(r, i) in child.children"
            :key="i + 1"
            :index="child.path + '/' + r.path"
          >
            <i :class="r.meta.icon" class="aside-route-icon"></i>
            <span class="aside-route-title">{{ r.meta.title }}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "Aside",
  data() {
    return {
      routeList: [], // 需要展示的路由集合
      perPath: "", // 权限路由路径
      userInfo: {},
      activeTextColor: "", // 选中菜单的字体颜色
    };
  },
  methods: {
    ...mapMutations("asideModule", { changeAside: "changeCollapse" }),
    ...mapMutations("userModule", ["getUser"]),
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
  computed: {
    ...mapState("asideModule", ["isCollapse"]),
    ...mapState("userModule", ["user"]),
    // 子路由集合
    routeChildList() {
      return this.routeList.filter((item) => {
        return item.children;
      });
    },
    // 没有子路由的集合
    routeNotChildList() {
      return this.routeList.filter((item) => {
        // console.log(!item.children)
        return !item.children;
      });
    },
  },
  mounted() {
    this.routeList = this.user.routerList;
  },
};
</script>

<style lang="less">
// 动态主题样式开始
.aside .el-menu {
  background-color: rgba(@primaryColor, 1);
  .el-submenu {
    .el-submenu__title:hover {
      background-color: rgba(@primaryColor, 1);
    }
  }
  .el-menu-item:hover {
    background-color: rgba(@primaryColor, 1);
  }
  .el-menu-item:focus {
    background-color: rgba(@primaryTextColor, 1);
    .aside-route-title,
    .aside-route-icon {
      color: rgb(@primaryColor);
    }
  }
  .aside-route-title {
    margin-left: 10px;
    color: rgb(@primaryTextColor);
  }
  .aside-route-icon {
    font-size: 20px;
    color: rgba(@primaryTextColor, 1);
  }
  .logo-title {
    color: rgba(@primaryTextColor, 1);
  }
}
// 动态主题样式结束
.aside {
  height: 100%;
  .aside-logo {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo-title {
      font-size: 24px;
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
.aside .el-menu {
  height: 100%;
  color: #fff;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  max-height: 800px;
}
.aside .changebtn {
  font-size: 40px;
  line-height: 60px;
  color: #409eff;
  cursor: pointer;
}
.aside .aside-route-icon {
  color: #fff;
}
</style>
