<!-- @format -->

<template>
  <div class="look-announcement">
    <el-card>
      <el-table :data="currentAnnouncementList" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="公告标题">
                <span>{{ props.row.a_title }}</span>
              </el-form-item>
              <el-form-item label="发布人">
                <span>{{ props.row.a_manager_name }}</span>
              </el-form-item>
              <el-form-item label="公告 ID">
                <span>{{ props.row.a_id }}</span>
              </el-form-item>
              <el-form-item label="发布人 ID">
                <span>{{ props.row.a_manager_id }}</span>
              </el-form-item>
              <el-form-item label="公告内容">
                <span>{{ props.row.a_content }}</span>
              </el-form-item>
              <el-form-item label="发布时间">
                <span>{{ props.row.a_issuetime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="公告 ID" prop="a_id"></el-table-column>
        <el-table-column label="标题" prop="a_title"></el-table-column>
        <el-table-column label="发布人" prop="a_manager_name"></el-table-column>
        <el-table-column label="发布时间" prop="a_issuetime"></el-table-column>
        <el-table-column label="是否必读" prop="a_isrequire"></el-table-column>
        <el-table-column label="操作" prop="">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="lookAnnouncement(scope.$index, scope.row)"
              >查看</el-button
            >
            <el-popconfirm
              title="这是一段内容确定删除吗？"
              @confirm="delAnnouncement(scope.$index, scope.row)"
              icon="el-icon-info"
              icon-color="red"
            >
              <el-button slot="reference" size="mini" type="danger"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
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
    <!-- dialog查看公告开始 -->
    <el-dialog title="查看公告" :visible.sync="dialogFormVisible" width="60%">
      <!-- <el-form :model="anForm">
        <el-form-item label="公告ID" :label-width="formLabelWidth">
          <span class="dialog-look-announcement">{{ anForm.a_id }}</span>
        </el-form-item>
        <el-form-item label="公告标题" :label-width="formLabelWidth">
          <span>{{ anForm.a_title }}</span>
        </el-form-item>
        <el-form-item label="发布人ID" :label-width="formLabelWidth">
          <span>{{ anForm.a_manager_id }}</span>
        </el-form-item>
        <el-form-item label="发布人" :label-width="formLabelWidth">
          <span>{{ anForm.a_manager_name }}</span>
        </el-form-item>
        <el-form-item label="公告内容" :label-width="formLabelWidth">
          <span>{{ anForm.a_content }}</span>
        </el-form-item>
        <el-form-item label="发布时间" :label-width="formLabelWidth">
          <span>{{ anForm.a_issuetime }}</span>
        </el-form-item>
      </el-form> -->
      <!-- 描述信息开始 -->
      <el-descriptions column="2">
        <el-descriptions-item label="公告ID">{{ anForm.a_id }}</el-descriptions-item>
        <el-descriptions-item label="公告标题">{{ anForm.a_title }}</el-descriptions-item>
        <el-descriptions-item label="发布人ID">{{ anForm.a_manager_id }}</el-descriptions-item>
        <el-descriptions-item label="发布人">{{ anForm.a_manager_name }}</el-descriptions-item>
        <el-descriptions-item label="公告内容">{{ anForm.a_content }}</el-descriptions-item>
        <el-descriptions-item label="发布时间">{{ anForm.a_issuetime }}</el-descriptions-item>
      </el-descriptions>
      <!-- 描述信息结束 -->

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- dialog查看公告结束 -->
  </div>
</template>

<script>
import {
  getAllAnnouncement,
  deleteAnnouncementById,
} from "../../api/announcement.js";

export default {
  name: "LookAnnouncement",
  data() {
    return {
      announcementList: [], // 所有公告集合
      anForm: {
        a_id: 0,
        a_title: "",
        a_content: "",
        a_manager_id: 0,
        a_manager_name: "",
        a_issuetime: "",
        a_isrequire: "是",
      }, // 查看详细公告
      formLabelWidth: "120px", // 查看公告dialog的label宽度
      dialogFormVisible: false, // 控制dialog查看公告是否显示
      currentPage: 1, // 当前页
      pageSize: 5, // 每页显示数据条数
      total: 0, // 数据总条数
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
    // 查看公告
    lookAnnouncement(index, row) {
      this.dialogFormVisible = true;
      // console.log("index=", index)
      // console.log("row=", row)
      this.anForm = row;
    },
    // 删除公告
    async delAnnouncement(index, row) {
      // console.log("index=", index)
      // console.log("row=", row)
      const { data } = await deleteAnnouncementById(row.a_id);
      // console.log("data=", data);
      if (data.status === 0) {
        this.$message({
          type: "success",
          message: data.message,
        });
      }
      let newIn = 0;
      this.announcementList.forEach((item, i) => {
        if (item.a_id === row.a_id) {
          return (newIn = i);
        }
      });
      this.announcementList.splice(newIn, 1);
    },
  },
  computed: {
    currentAnnouncementList() {
      return this.announcementList.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
  async mounted() {
    const { data } = await getAllAnnouncement();
    // console.log("data=", data);
    this.announcementList.push(...data.data.announcement);
    this.announcementList = this.announcementList.filter(
      (item) => (item.a_isrequire = item.a_isrequire === 1 ? "是" : "否")
    );
    this.total = this.announcementList.length;
  },
};
</script>

<style lang="less">
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.look-announcement .el-dialog .el-form .el-form-item__label {
  color: #9eadc2;
  // color: red;
}
.look-announcement .el-card .el-table {
  margin-bottom: 20px;
}
</style>
