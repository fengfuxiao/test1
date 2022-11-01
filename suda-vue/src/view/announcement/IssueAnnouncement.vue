<!-- @format -->

<template>
  <div class="issue-announcement">
    <el-card>
      <el-form
        ref="announcementForm"
        :model="announcementForm"
        label-width="80px"
      >
        <el-form-item label="公告标题">
          <el-input v-model="announcementForm.a_title" ref="announcementTitle"></el-input>
        </el-form-item>
        <el-form-item label="公告内容">
          <el-input
            type="textarea"
            v-model="announcementForm.a_content"
          ></el-input>
        </el-form-item>

        <el-form-item label="是否必读">
          <el-radio-group v-model="announcementForm.a_isrequire">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button @click="cleanIssueAnnouncement">清空</el-button>
          <el-button
            type="primary"
            @click="onIssueAnnouncement(announcementForm)"
            >发布</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addAnnouncement } from "../../api/announcement";
import { Message } from "element-ui";

export default {
  name: "IssueAnnouncement",
  data() {
    return {
      announcementForm: {
        a_title: "",
        a_content: "",
        a_isrequire: "",
      },
    };
  },
  methods: {
    // 点击发布公告
    async onIssueAnnouncement(antForm) {
      // console.log("antForm=", antForm)
      // console.log(antForm.a_isrequire === "是");
      antForm.a_isrequire = antForm.a_isrequire === "是" ? 1 : 0;
      const { data } = await addAnnouncement(antForm);
      // console.log("data=", data)
      if (data.status === 0) {
        Message({
          type: "success",
          message: data.message,
        });
      }
      // 清空表单内容
      this.cleanIssueAnnouncement();
    },
    // 清空发布公告
    cleanIssueAnnouncement() {
      this.announcementForm = {
        a_title: "",
        a_content: "",
        a_isrequire: false,
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.announcementTitle.focus()
    })
  }
};
</script>

<style></style>
