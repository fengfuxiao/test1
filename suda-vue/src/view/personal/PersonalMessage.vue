<!-- @format -->

<template>
  <div class="personal-message">
    <el-card>
      <div class="avatar">
        <el-avatar
          src="https://s1.ax1x.com/2022/10/19/xstyHP.jpg"
          :size="100"
        ></el-avatar>
      </div>
      <el-form ref="userInfo" :model="userInfo" label-width="80px">
        <el-form-item label="用户名">
          <span>{{ userInfo.username }}</span>
        </el-form-item>
        <el-form-item label="昵称">
          <span>{{ userInfo.nickname }}</span>
        </el-form-item>
        <el-form-item label="年龄">
          <span>{{ userInfo.age }}</span>
        </el-form-item>
        <el-form-item label="性别">
          <span>{{ userInfo.gender }}</span>
          <!-- <el-input v-model="userInfo.gender"></el-input> -->
        </el-form-item>
        <el-form-item label="地址">
          <span>{{ userInfo.address }}</span>
        </el-form-item>
        <el-form-item label="角色">
          <span>{{ userInfo.r_id = userInfo.r_id === 1 ? "普通用户" : "管理员" }}</span>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PersonalMessage",
  data() {
    return {
      userInfo: {},
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
  computed: {
    ...mapState("userModule", ["user"]),
  },
  mounted() {
    // console.log("user=", this.user);
    this.userInfo = this.user;
    console.log("userinfo=", this.userInfo);
  },
};
</script>

<style lang="less">
.personal-message .el-card__body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.personal-message .avatar {
  display: inline-block;
}
.personal-message {
  .el-form {
    .el-form-item__label {
      // margin-right: 2px;
    }
  }
}
</style>
