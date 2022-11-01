<!-- @format -->

<template>
  <div class="main">
    <el-container>
      <el-aside width="auto">
        <Aside />
      </el-aside>
      <el-container>
        <el-header height="auto">
          <Header />
        </el-header>
        <el-main height="100%">
          <el-scrollbar height="100%">
            <Home v-if="$route.path == '/main' ? true : false" />
            <keep-alive include="IssueAnnouncement">
              <router-view></router-view>
            </keep-alive>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
    <!-- 主题设置抽屉开始 -->
    <div class="setting">
      <i class="fa fa-cog" @click="drawer=true"></i>
    </div>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :direction="direction"
      size="20%"
    >
      <span>我来啦!</span>
      <button @click="changeThemeToDark">dark</button>
      <button @click="changeThemeToLight">light</button>
      <!-- <button @click="changeToDefault">default</button> -->
      <el-color-picker v-model="colorTheme"></el-color-picker>
    </el-drawer>
    <!-- 主题设置抽屉结束 -->
  </div>
</template>

<script>
import Aside from "../components/common/aside/Aside.vue";
import Header from "../components/common/header/Header.vue";
import Home from "./home/Home.vue";
import { setTheme } from '../themes/theme';

export default {
  name: "Main",
  components: {
    Aside,
    Header,
    Home,
  },
  data() {
    return {
      isHome: true,
      drawer: false, // 主题样式抽屉是否显示
      direction: "rtl", // 抽屉打开的方向
      colorTheme: "#000", //
    };
  },
  methods: {
    // 初始化主题
    initTheme() {
      setTheme()
    },
    // 修改为dark主题
    changeThemeToDark() {
      setTheme("dark")
    },
    // 修改为light主题
    changeThemeToLight() {
      setTheme("light")
    },
    // // 默认主题
    // changeToDefault() {
    //   setTheme("default")
    // }
  },
  mounted() {
    this.initTheme()
  },
};
</script>

<style lang="less">
// 动态主题样式开始
.el-card {
  background-color: rgba(@primaryCardColor, 1);
}
.el-header {
  color: rgb(@primaryHeaderTextColor);
}
.el-aside {
  background-color: rgba(@primaryColor, 1);
  // background-color: @primaryColor;
}

// 动态主题样式结束
.setting {
  position: fixed;
  top: 50%;
  right: 0;
  margin-top: -18px;
  z-index: 99;
  i {
    font-size: 24px;
    padding: 6px;
    background-color: skyblue;
    color: #fff;
    border-radius: 10px 0 0 10px;
    cursor: pointer;
  }
}

.el-header {
  line-height: 40px;
  padding: 0;
}

.el-header {
  height: 100%;
}

.el-aside {
  /* background-color: #102642; */
  color: #333;
  height: 100%;
  overflow: hidden;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100%;
}

.main,
.main .el-container {
  height: 100%;
}
/* 滚动条样式 */
::-webkit-scrollbar {
  width: 5px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: #dbd9d9;
  border-radius: 3px;
}
.is-horizontal {
  display: none;
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
