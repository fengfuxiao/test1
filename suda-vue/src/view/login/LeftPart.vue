<template>
  <!-- 表单左侧部分 -->
  <div class="form_left">
    <img src="../../img/loginBack.jpg" class="left_back" />
    <div class="left_content"></div>
    <div class="left_text">
      <div class="title">
        快递物流
        <br />
        管理系统
      </div>

      <div class="text_img">
        <img src="../../img/waves.png" />
      </div>

      <div class="text">Leading the future</div>

      <div class="text_img1">
        <img src="../../img/science.png" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LeftPart",
  };
</script>

<style>
  .login_form .form_left {
    width: 55%;
    height: 100%;
    position: relative;
  }

  .login_form .form_left .left_back {
    width: 100%;
    height: 100%;
    border-radius: 10px 0 0 10px;
  }

  .login_form .form_left .left_content{
    width: 220px;
    height: 100%;
    background-color: #2a3f54;
    opacity: .8;
    border-radius: 10px 0 0 10px;
    position: absolute;
    left: 0;
    top: 0;
  }

  .login_form .form_left .left_text {
    width: 220px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    padding-left: 44px;
  }

  .login_form .form_left .left_text .title {
    width: 124px;
    height: 64px;
    font-size: 30px;
    font-family: SimSun;
    font-weight: 400;
    color: #fff;
    margin-top: 50px;
  }

  .login_form .form_left .left_text .text_img {
    width: 57px;
    height: 16px;
    margin-top: 70px;
  }

  .login_form .form_left .left_text .text_img img {
    width: 100%;
    height: 100%;
  }

  .login_form .form_left .left_text .text {
    width: 107px;
    height: 13px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #fff;
    margin-top: 20px;
  }

  .login_form .form_left .left_text .text_img1 {
    width: 130px;
    height: 130px;
    margin-top: 70px;
  }

</style>