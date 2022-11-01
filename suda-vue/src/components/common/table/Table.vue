<!-- @format -->
<!-- 表格组件封装 -->

<template>
  <div class="table">
    <el-table :data="tableList" :empty-text="emptyText">
      <el-table-column fixed prop="u_id" label="编号" width="80">
      </el-table-column>
      <el-table-column prop="u_username" label="用户名" width="120">
      </el-table-column>
      <el-table-column prop="u_nickname" label="昵称" width="120">
      </el-table-column>
      <el-table-column prop="u_gender" label="性别" width="120">
      </el-table-column>
      <el-table-column prop="u_age" label="年龄" width="120"> </el-table-column>
      <el-table-column prop="u_address" label="地址" width="150">
      </el-table-column>
      <el-table-column prop="r_id" label="角色" width="150"> </el-table-column>
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
  </div>
</template>

<script>
export default {
  name: "Table",
  props: ["tableList"],
  data() {
    return {
      pageSize: 5, // 每页多少条
      total: 0, // 总数据条数
      currentPage: 1, // 当前所在页
    };
  },
  methods: {},
  computed: {
    currentList() {
      return this.tableList.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
  mounted() {},
};
</script>

<style></style>
