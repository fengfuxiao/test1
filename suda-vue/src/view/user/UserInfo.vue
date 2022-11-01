<!-- @format -->

<template>
  <div class="user">
    <el-card>
      <!-- 头部搜索表单开始 -->
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        height="100%"
      >
        <el-form-item label="查询">
          <el-input
            v-model="formInline.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearchReset">重置</el-button>
          <el-button type="primary" @click="onSearchUser(formInline.username)"
            >查询</el-button
          >
        </el-form-item>
        <br />
        <el-form-item label="新增">
          <el-button type="primary" @click="dialogAddVisible = true"
            >新增用户</el-button
          >
        </el-form-item>
      </el-form>
      <!-- 头部搜索表单结束 -->
      <!-- 用户信息表格开始 -->
      <el-table :data="currentUserList" :empty-text="emptyText">
        <el-table-column fixed prop="u_id" label="编号" width="80">
        </el-table-column>
        <el-table-column prop="u_username" label="用户名" width="120">
        </el-table-column>
        <el-table-column prop="u_nickname" label="昵称" width="120">
        </el-table-column>
        <el-table-column prop="u_gender" label="性别" width="120">
        </el-table-column>
        <el-table-column prop="u_age" label="年龄" width="120">
        </el-table-column>
        <el-table-column prop="u_address" label="地址" width="150">
        </el-table-column>
        <el-table-column prop="r_id" label="角色" width="150">
        </el-table-column>
        <el-table-column prop="u_avatar" label="头像" width="120">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="onEditUser(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              confirm-button-text="是"
              cancel-button-text="否"
              icon="el-icon-info"
              icon-color="red"
              confirm-button-type="danger"
              title="删除该用户？"
              @confirm="onDelUser(scope.$index, scope.row)"
            >
              <el-button size="mini" type="danger" slot="reference"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 用户信息表格结束 -->
      <!-- 分页功能开始 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 分页功能结束 -->
    </el-card>
    <!-- 点击编辑用户信息dialog开始 -->
    <el-dialog
      title="编辑用户信息"
      :visible.sync="dialogEditVisible"
      width="50%"
    >
      <el-form :model="eidtUserForm">
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input
            v-model="eidtUserForm.u_id"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            v-model="eidtUserForm.u_username"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input
            v-model="eidtUserForm.u_nickname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio-group v-model="eidtUserForm.u_gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="eidtUserForm.u_age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input
            v-model="eidtUserForm.u_address"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-input
            v-model="eidtUserForm.u_avatar"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="onUpdateUserInfo(eidtUserForm)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 点击编辑用户信息diaplog结束 -->
    <!-- 新增用户dialog开始 -->
    <el-dialog
      title="编辑用户信息"
      :visible.sync="dialogAddVisible"
      width="50%"
    >
      <el-form :model="newUser">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="newUser.u_username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            v-model="newUser.u_password"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="newUser.u_nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio-group v-model="newUser.u_gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="newUser.u_age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="newUser.u_address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <!-- <el-input
            v-model="newUser.r_id"
            autocomplete="off"
          ></el-input> -->
          <el-select v-model="newUser.r_id" placeholder="请选择">
            <el-option
              v-for="item in optionsRole"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-input v-model="newUser.u_avatar" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser(newUser)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增用户dialog结束 -->
  </div>
</template>

<script>
import {
  getAllUser,
  getUserByUsername,
  updateUserInfo,
  deleteUser,
  insertUser,
} from "../../api/user.js";

export default {
  name: "User",
  data() {
    return {
      userList: [], // 所有用户数据
      currentPage: 1, // 当前页
      pageSize: 5, // 每页显示数据条数
      total: 0, // 数据总条数
      formInline: {
        username: "",
      },
      emptyText: "", // 查询为空时的提示信息
      dialogEditVisible: false, // 控制编辑用户信息dialog的显隐
      dialogAddVisible: false, // 控制新增用户dialog的显隐
      formLabelWidth: "120px",
      eidtUserForm: {
        u_id: "",
        u_username: "",
        u_nickname: "",
        u_gender: "",
        u_age: "",
        u_address: "",
        r_id: "",
        u_avatar: "",
      },
      // 新增用户
      newUser: {
        u_id: "",
        u_username: "",
        u_password: "",
        u_nickname: "",
        u_gender: "",
        u_age: "",
        u_address: "",
        r_id: "",
        u_avatar: "",
      },
      // 新增用户角色选项,
      optionsRole: [
        {
          label: "普通用户",
          value: 1,
        },
        {
          label: "管理员",
          value: 2,
        },
      ],
    };
  },
  methods: {
    // 改变每页的数据条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    // 改变当前页数
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    // 根据用户名查询用户
    async onSearchUser(username) {
      // 如果没有输入用户，则不需要调用接口
      if (username === "") {
        return;
      }
      const params = {
        u_username: username,
      };
      const { data } = await getUserByUsername(params);
      // console.log("data=", data);
      // 如果未查到该用户
      if (data.user.length === 0) {
        this.emptyText = data.message;
      }
      // 查询之后，当前页改为第一页
      this.currentPage = 1;
      // 更新数据总数
      this.total = data.count;
      this.userList = data.user;
    },
    // 重置查询用户名信息
    async onSearchReset() {
      this.userList = [];
      // 清空搜索框内容
      this.formInline.username = "";
      const { data } = await getAllUser();
      this.userList.push(...data.data.user);
      this.userList = this.userList.filter(
        (item) => (item.r_id = item.r_id === 1 ? "普通用户" : "管理员")
      );
      this.total = this.userList.length
    },
    // 编辑用户
    onEditUser(index, row) {
      this.eidtUserForm = {
        u_id: row.u_id,
        u_username: row.u_username,
        u_nickname: row.u_nickname,
        u_gender: row.u_gender,
        u_age: row.u_age,
        u_address: row.u_address,
        u_avatar: row.u_avatar,
      };
      this.dialogEditVisible = true;
    },
    // 更新用户信息
    async onUpdateUserInfo(user) {
      // 改变后台数据
      const { data } = await updateUserInfo(user);
      // console.log("data=", data);
      if (data.status === 0) {
        this.$message({
          type: "success",
          message: data.message,
        });
        let ind = 0;
        this.userList.forEach((item, index) => {
          if (item.u_id == user.u_id) {
            // console.log(this.userList.indexOf(item))
            return (ind = this.userList.indexOf(item));
          }
        });
        // 改变前台数据
        this.userList[ind].u_nickname = user.u_nickname;
        this.userList[ind].u_gender = user.u_gender;
        this.userList[ind].u_age = user.u_age;
        this.userList[ind].u_address = user.u_address;
        this.userList[ind].u_avatar = user.u_avatar;
        // this.userList[ind] = {...user}
        this.dialogEditVisible = false;
      }
    },
    // 删除用户
    async onDelUser(index, row) {
      // console.log("index=", index)
      // console.log("row=", row);
      const { data } = await deleteUser(row.u_id);
      console.log("data=", data);
      if (data.status === 0) {
        let ind = 0;
        this.userList.forEach((item, i) => {
          if (item.u_id === row.u_id) {
            return (ind = i);
          }
        });
        // console.log(ind)
        this.userList.splice(ind, 1);
        this.$message({
          type: "success",
          message: data.message,
        });
      } else {
        this.$message({
          type: "error",
          message: "删除失败",
        });
      }
      this.total = this.userList.length
    },
    // 添加用户
    async addUser(user) {
      // this.dialogAddVisible = true
      // console.log("user=", user)
      const { data } = await insertUser(user);
      // console.log("data=", data);
      if (data.status === 1)
        return this.$message({
          type: "warning",
          message: data.message,
        });
      this.$message({
        type: "success",
        message: data.message,
      });
      data.data.r_id = data.data.r_id === 1 ? "普通用户" : "管理员";
      this.dialogAddVisible = false;
      this.userList.push(data.data);
    },
  },
  computed: {
    currentUserList() {
      return this.userList.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
  async mounted() {
    const { data } = await getAllUser();
    this.userList.push(...data.data.user);
    this.userList = this.userList.filter(
      (item) => (item.r_id = item.r_id === 1 ? "普通用户" : "管理员")
    );
    this.total = this.userList.length;
  },
};
</script>

<style lang="less">
.user .el-table th,
.user .el-table tr {
  background-color: rgba(@primaryTableColor, 1);
  // background-color: rgba(@primaryColor, 1);
}
.el-card .el-table {
  margin-bottom: 20px;
}
</style>
