<!-- @format -->

<template>
  <div class="search-order">
    <el-card>
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
      <!-- 头部搜索表单开始 -->
      <!-- <el-form
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
      </el-form> -->
      <!-- 头部搜索表单结束 -->
    </el-card>
    <!-- 点击编辑用户信息dialog开始 -->
    <!-- <el-dialog
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
    </el-dialog> -->
    <!-- 点击编辑用户信息diaplog结束 -->
    <!-- 新增用户dialog开始 -->
    <!-- <el-dialog
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
    </el-dialog> -->
    <!-- 新增用户dialog结束 -->
  </div>
</template>

<script>
export default {
  name: "SearchOrder",
  data() {
    return {}
  },
  methods: {},
  mounted() {
    
  }
};
</script>

<style></style>
