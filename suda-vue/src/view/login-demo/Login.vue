<!-- @format -->

<template>
  <div class="login">
    <el-card class="box-card">
      <el-form
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :model="form"
      >
        <el-form-item label="用户名">
          <el-input v-model="form.u_username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            autocomplete="off"
            v-model="form.u_password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onLogin(form)">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from "../../api/user.js";
import { mapMutations } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      form: {
        u_username: "WangMin",
        u_password: "admire",
      },
    };
  },
  methods: {
    ...mapMutations("userModule", ["setUser"]),
    onLogin(form) {
      login(form).then((res) => {
        // console.log("res=", res);
        const { data } = res;
        const token = data.token;
        if (data.status === 0) {
          // console.log("router==", this.$router)
          this.setUser(token);
          this.$router.push("/main");
          this.$message({
            type: "success",
            message: "登录成功"
          })
        }
      });
    },
  },
};
</script>

<style lang="less">
.login {
  .box-card {
    width: 480px;
  }
}
</style>
