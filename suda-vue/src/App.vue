<!-- @format -->

<template>
  <div id="app">
    <router-view></router-view>
    <!-- <button @click="onClick">点我</button> -->
    <!-- <Demo ref="demoChild" /> -->
  </div>
</template>

<script>
import { mixins } from "./mixin/index.js"
import Demo from "./demo.vue"

export default {
  name: "App",
  // mixins: [mixins],
  components: {
    // Demo,
  },
  // 刷新方法
  // provide() {
  //   return {
  //     reload: this.reload,
  //   };
  // },
  data() {
    return {
      // isRouterAlive: true,
    }
  },
  methods: {
    // 页面刷新，重新渲染数据
    // reload() {
    //   this.isRouterAlive = false
    //   this.$nextTick(() => {
    //     this.isRouterAlive = true
    //   })
    // }
  },
  mounted() {
    // console.log("我是app组件中的mounted")
    // console.log(this.$refs.demoChild)
    // this.$refs.demoChild.sayHello()
  }
};
</script>

<style>
@import url("./assets/css/reset.css");
html,
body,
#app {
  height: 100%;
}
</style>
