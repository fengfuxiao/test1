<!-- @format -->

<template>
  <div class="header">
    <div class="top">
      <div class="header-left">
        <el-button
          :icon="isCollapse == true ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          @click="changeAside"
        ></el-button>
        <!-- 头部面包屑 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-if="$route.path !== '/main'"
            :to="{ path: '/main' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item
            v-for="(bread, index) in breadList"
            :key="index"
            >{{ bread.meta.title }}</el-breadcrumb-item
          >
        </el-breadcrumb>

      </div>
      <div class="header-right">
        <el-dropdown trigger="click">
          <el-avatar
            shape="circle"
            :size="40"
            :fit="fit"
            :src="imgUrl"
            :icon="this.user.u_avatar == '' ? 'el-icon-user-solid' : ''"
          ></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="hr-username">{{ this.user.username }}</span>
      </div>
    </div>
    <!-- 头部标签 -->
    <div class="tags">
      <el-tag
        v-for="tag in tags"
        :key="tag.title"
        :closable="true"
        :disable-transitions="false"
        @close="handleClose(tag)"
        @click="onTag(tag)"
        :class="$route.meta.title == tag.title ? 'header-tag' : ''"
        type="plain"
      >
        {{ tag.title }}
      </el-tag>
    </div>

    <!-- 提示是否退出登录start -->
    <el-dialog
      title="提示"
      :visible.sync="logoutDialogVisible"
      width="30%"
      :before-close="logoutHandleClose"
      :show-close="false"
      :center="true"
    >
      <span class="dialog-span">是否退出登录</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="logoutDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onConfirmLogout">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 提示是否退出登录end -->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import avatar from "@/assets/img/avatar1.jpeg"

export default {
  name: "Header",
  data() {
    return {
      tags: [],
      fit: "contain", // 头像适应容器框的格式
      imgUrl: "https://s1.ax1x.com/2022/10/19/xstyHP.jpg",
      logoutDialogVisible: false, // 控制退出提示dialog是否显示
    };
  },
  methods: {
    ...mapMutations("asideModule", { changeAside: "changeCollapse" }),
    ...mapMutations("userModule", ["removeUser"]),
    // 关闭tag标签
    handleClose(tag) {
      // 判断是否要删除当前的tag
      if (this.$route.fullPath === tag.fullPath)
        return this.$message({
          message: "不能删除当前页",
          type: "warning",
        });
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    // 点击tag标签跳转到对应路径的页面
    onTag(tag) {
      if (this.$route.fullPath === tag.fullPath)
        return this.$message({
          message: "已在当前页",
          type: "warning",
        });
      this.$router.push(tag.fullPath);
    },
    // 退出登录
    onLogout() {
      // 提示用户是否确定退出
      this.logoutDialogVisible = true;
      // 退出之后把浏览器的token和用户名等信息清空
      // 路由导航到登录页面
    },
    // 点击关闭事件
    logoutHandleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {})
        .catch((_) => {});
    },
    // 点击确认退出登录
    onConfirmLogout() {
      // 清空用户信息
      this.removeUser();
      this.logoutDialogVisible = false;
      // 强制刷新页面
      location.reload();
    },
  },
  computed: {
    ...mapState("asideModule", ["isCollapse"]),
    ...mapState("userModule", ["user"]),
    breadList() {
      const { matched } = this.$route;
      return { ...matched };
    },
  },
  watch: {
    // 监听路径变化
    $route() {
      const { meta } = this.$route;
      // console.log("route=====", this.$route)
      // 根据tags对象数组的title属性中是否已包含该路径
      let isCon = false;
      this.tags.forEach((item) => {
        if (item.title === meta.title) isCon = true;
      });
      if (!isCon)
        this.tags.push({ title: meta.title, fullPath: this.$route.fullPath });
    },
  },
  mounted() {
    const { meta } = this.$route;
    this.tags.push({ title: meta.title, fullPath: this.$route.fullPath });
    // console.log("user=", this.user);
  },
};
</script>

<style lang="less">
// 动态样式主题开始
.header {
  .top,
  .tags {
    background-color: rgba(@primaryHeaderColor, 1);
  }
  .hr-username {
    color: rgb(@primaryHeaderTextColor);
  }
  .el-breadcrumb-item {
    color: rgb(@primaryHeaderTextColor);
  }
}
// 动态样式主题结束
.header {
  width: 100%;
  background-color: #e9eef2;
  border-bottom: 2px solid #e9eef2;
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2px;
    // background-color: #fff;
  }
  .header-right {
    margin: 10px 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-dropdown {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.tags {
  // padding: 0 0 10px, 10px;
  padding-left: 10px;
  padding-bottom: 4px;
  // background-color: #fff;
  .el-tag {
    margin-left: 10px;
  }
}
.header .el-button {
  border: 0;
  font-size: 20px;
  height: 100%;
}
.header .el-button:hover {
  background-color: #fff;
  color: #5f6266;
}
.header .el-button:focus {
  background-color: #fff;
  color: #5f6266;
}
.header .el-breadcrumb {
  display: inline-block;
}
.header .el-tag {
  color: #485061;
  cursor: pointer;
  border: 1px solid #d8dce5;
}
.el-tag .el-icon-close {
  color: #485061;
}
.header .header-tag {
  background-color: #41b982;
  color: #fff;
  border: 0;
}
.header-tag .el-icon-close {
  color: #fff;
}
.header-tag .el-icon-close:hover {
  background-color: gray;
}
.header-right .el-avatar {
  width: 80px;
  height: 80px;
  margin-right: 10px;
}
.header-right .el-avatar i {
  font-size: 24px;
}
.el-dialog .dialog-span {
  font-size: 18px;
}
</style>
