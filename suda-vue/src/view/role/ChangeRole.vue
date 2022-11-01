<!-- @format -->

<template>
  <div class="change-role">
    <el-card>
      <!-- 用户信息表格开始 -->
      <el-table :data="currentUserList" :empty-text="emptyText">
        <el-table-column fixed prop="u_id" label="编号" width="120">
        </el-table-column>
        <el-table-column prop="u_username" label="用户名" width="180">
        </el-table-column>
        <el-table-column prop="u_nickname" label="昵称" width="180">
        </el-table-column>
        <el-table-column prop="r_id" label="角色" width="180">
        </el-table-column>
        <el-table-column label="管理员" width="200">
          <template slot-scope="scope">
            <el-switch
              style="display: block"
              :value="scope.row.r_id==='管理员' ? true : false"
              active-color="#13ce66"
              inactive-color="gray"
              @change="changeRole(scope.row)"
            >
            </el-switch>
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
  </div>
</template>

<script>
import { getAllUser, updateRole } from "../../api/user.js";

export default {
  name: "User",
  data() {
    return {
      userList: [], // 所有用户数据
      currentPage: 1, // 当前页
      pageSize: 5, // 每页显示数据条数
      total: 0, // 数据总条数
      emptyText: "", // 查询为空时的提示信息
      formLabelWidth: "120px",
      roleValue: true,
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
    // 改变用户的角色
    async changeRole(row) {
      // console.log("row=", row)
      const data = await updateRole(row.u_id)
      console.log("data=", data)
      let i = 0
      this.userList.forEach((item, index) => {
        if(row.u_id === item.u_id) {
          i = index
        }
      })
      this.userList[i].r_id = row.r_id === "普通用户" ? "管理员" : "普通用户"
    }
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
    // this.roleValue = this.
  },
};
</script>

<style scoped lang="less">
.el-card .el-table {
  margin-bottom: 20px;
}
</style>
