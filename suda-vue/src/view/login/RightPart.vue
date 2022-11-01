<!-- @format -->

<template>
  <!-- 表单右侧部分 -->
  <div class="form_right">
    <img src="../../img/fire_clode.png" class="logo" />
    <!-- 登陆界面 -->
    <form
      action=""
      class="el-form login-form el-form--label-left"
      id="login"
      autocomplete="on"
      style="margin-top: 45px"
      v-if="login"
    >
      <div class="form_item">
        <span class="svg-container">
          <img src="../../img/user.png" />
        </span>
        <input type="text" placeholder="请输入手机号码" v-model="user.username" class="form_input" />
      </div>

      <div class="form_item">
        <span class="svg-container">
          <img src="../../img/lock.png" alt="" />
        </span>
        <input type="password" placeholder="请输入密码" v-model="user.password" class="form_input" />
      </div>

      <div class="radioBox">
        <input
          type="checkbox"
          name="color-input-red"
          class="chat-button-location-radio-input"
        />
        <label for="color-input-red"> </label>
        <span class="radioText">记住密码</span>
      </div>

      <div class="btnBox">
        <button
          type="button"
          class="el-button submitBtn el-button--primary el-button--medium"
        >
          <span @click="onLogin(user)">立即登录</span>
        </button>
        <div
          class="huan"
          @click="
            goToRegister = !goToRegister;
            login = !login;
          "
        >
          去注册
        </div>
      </div>
    </form>

    <!-- 注册界面 -->
    <form
      action=""
      class="el-form login-form el-form--label-left"
      id="registered"
      v-if="goToRegister"
    >
      <div class="form_item">
        <span class="svg-container">
          <img src="../../img/user.png" />
        </span>
        <input
          type="text"
          placeholder="用户名"
          class="form_input"
          v-model="registerUser.username"
        />
      </div>
      <div class="form_item">
        <span class="svg-container">
          <img src="../../img/lock.png" />
        </span>
        <input
          type="password"
          placeholder="设置登陆密码(8-15位)"
          maxlength="15"
          class="form_input"
          v-model="registerUser.password"
          @blur="blurPassword"
        />
      </div>
      <div class="form_item">
        <span class="svg-container">
          <img src="../../img/lock.png" />
        </span>
        <input
          type="password"
          placeholder="确认密码"
          class="form_input"
          v-model="registerUser.confirmPassword"
        />
      </div>
      <div class="form_item">
        <span class="svg-container">
          <img src="../../img/phone.png" />
        </span>
        <input
          type="text"
          placeholder="手机号码"
          class="form_input"
          v-model="registerUser.telephone"
        />
      </div>
      <div class="form_item">
        <span class="svg-container">
          <img src="../../img/envelope.png" />
        </span>
        <input
          type="text"
          placeholder="验证码"
          class="form_input"
          v-model="user.code"
        />
        <div class="verificationCode">
          <button
            type="button"
            class="el-button el-button--text el-button--medium"
            ref="obtainingCodeButton"
          >
            <span @click="regTel" ref="obtainingCodeSpan">获取验证码</span>
          </button>
        </div>
      </div>
      <div class="btnBox">
        <button
          type="button"
          class="el-button submitBtn el-button--primary el-button--medium"
          @click="registerNow"
        >
          <span>立即注册</span>
        </button>
        <div
          class="huan"
          @click="
            goToRegister = !goToRegister;
            login = !login;
          "
        >
          去登陆
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { login } from "../../api/user.js";
import { mapMutations } from "vuex";

export default {
  name: "RightPart",
  data() {
    return {
      goToRegister: false,
      login: true,
      user: {
        username: "",
        password: "",
        confirmPassword: "",
        telephone: "",
        code: "",
      },
      registerUser: {
        username: "",
        password: "",
        confirmPassword: "",
        phone: "",
      }
    };
  },
  methods: {
    registerNow() {
      if (this.user.username == "") {
        alert("请输入用户名！");
      }

      if (
        this.user.password == "" &&
        this.user.username !== "" &&
        this.user.code == ""
      ) {
        alert("请输入密码！");
      }

      if (
        this.user.confirmPassword !== this.user.password &&
        this.user.confirmPassword !== ""
      ) {
        alert("密码不一致，请重新输入！");
      }

      if (
        (this.user.telephone == "" || this.user.telephone !== "") &&
        this.user.username !== "" &&
        this.user.password !== "" &&
        this.user.code == ""
      ) {
        alert("请验证手机号！");
      }

      if (
        this.user.code !== "" &&
        this.user.password !== "" &&
        this.user.confirmPassword == "" &&
        this.user.username !== ""
      ) {
        alert("密码不一致，请重新输入！");
      } else if (this.user.code !== "" && this.user.password == "") {
        alert("请输入登陆密码！");
      }
    },
    blurPassword() {
      const length = this.user.password.length;
      if (length < 8 || length > 15) {
        alert("请输入长度为8~15位的密码！");
      }
      console.log("length");
    },
    regTel() {
      //手机号码正则匹配校验
      const reg_tel = new RegExp(
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      );
      const result = reg_tel.test(this.user.telephone);
      if (this.user.telephone && !result) {
        alert("请输入正确的手机号码！");
      } else if (this.user.telephone == "") {
        alert("手机格式不正确！");
      } else {
        var num = 59;
        var timer = setInterval(() => {
          if (num === 0) {
            clearInterval(timer);
            this.$refs.obtainingCodeSpan.style.color = "#337ab7";
            this.$refs.obtainingCodeSpan.innerText = "获取验证码";
            this.$refs.obtainingCodeSpan.style.pointerEvents = "auto";
            this.$refs.obtainingCodeButton.style.cursor = "pointer";
            num = 59;
          } else {
            this.$refs.obtainingCodeSpan.style.pointerEvents = "none";
            this.$refs.obtainingCodeButton.style.cursor = "not-allowed";
            this.$refs.obtainingCodeSpan.style.color = "#606266";
            this.$refs.obtainingCodeSpan.innerText = num + "秒后重新发送";
            console.log(this.$refs.obtainingCodeSpan.innerText);
            num--;
          }
        }, 1000);
      }
    },
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
            message: "登录成功",
          });
        }
      });
    },
  },
};
</script>

<style>
.login_form .form_right {
  width: 45%;
  height: 100%;
  text-align: center;
  border-radius: 0 10px 10px 0;
  background-color: #fff;
}

.login_form .form_right .logo {
  width: 80px;
  height: 80px;
  margin: 30px auto;
  margin-top: 45px;
}

.login_form .form_right .login-form .form_item {
  width: 320px;
  height: 55px;
  line-height: 55px;
  border-bottom: 1px solid #999;
  margin: 0 auto;
  position: relative;
}

.login_form .form_right .login-form .form_item .svg-container {
  display: inline-block;
  width: 21px;
  height: 21px;
  position: absolute;
  top: 3px;
  left: 16px;
}

.login_form .form_right .login-form .form_item .svg-container img {
  width: 100%;
}

.login_form .form_right .login-form .form_item .form_input {
  width: 200px;
  height: 40px;
  outline: none;
  border: none;
  font-size: 18px;
}

.login_form .form_right .login-form .radioBox {
  position: relative;
  width: 270px;
  margin: 0 auto;
  margin-top: 24px;
  text-align: left;
  padding-left: 20px;
}

.login_form .form_right .login-form .radioBox #color-input-red + label {
  display: block;
  width: 18px;
  height: 18px;
  cursor: pointer;
  position: absolute;
  top: 2px;
  left: -10px;
  border: 2px solid #2a3f54;
}

.login_form .form_right .login-form .radioBox .radioText {
  display: inline-block;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 300;
  color: #919191;
}

input[type="checkbox" i] {
  background-color: initial;
  cursor: default;
  appearance: auto;
}

label {
  font-weight: 700;
}

.login_form .form_right .login-form .btnBox .submitBtn {
  width: 280px;
  height: 60px;
  background: #2a3f54;
  box-shadow: 0 7px 22px 0 rgb(42 63 84 /49%);
  border-radius: 30px;
  font-size: 26px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #fff;
  outline: none;
  border: none;
  margin-top: 20px;
  cursor: pointer;
}

.login_form .form_right .login-form .btnBox .huan {
  font-size: 20px;
  font-family: Microsoft Yahei;
  font-weight: 400;
  color: #2a3f54;
  cursor: pointer;
  width: 60px;
  margin: 0 auto;
  margin-top: 30px;
}

button,
input {
  overflow: visible;
}

.el-button--text {
  border-color: transparent;
  color: #337ab7;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
}

.el-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  color: #606266;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 400;
  padding: 12px - 20px;
  font-size: 14px;
  border-radius: 4px;
}

.el-button--medium {
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
}

.login_form .form_right .login-form .form_item .verificationCode {
  position: absolute;
  width: 110px;
  height: 50px;
  right: 0;
  top: 2px;
  line-height: 50px;
}
</style>
