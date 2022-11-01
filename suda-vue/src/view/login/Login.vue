<!-- @format -->

<template>
  <div class="login_form login">
    <LeftPart/>
    <RightPart/>
  </div>
</template>

<script>
  import LeftPart from './LeftPart.vue';
  import RightPart from './RightPart.vue';

  export default {
    name: "Login",
    components: {LeftPart,RightPart}
  };
</script>

<style>
.login {
  background-color: rgba(0, 0, 0, .4);
}
  body {
    background-color: rgba(0, 0, 0, .7);
    background: url(../../img/backgroundImage_2.jpg);
    background-repeat: no-repeat;
    background-size: 1580px 1300px
  }

  .form_left,.form_right {
    display: inline-block;
  }

  .login_form {
    width: 1000px;
    height: 600px;
    top: 50%;
    left: 50%;
    margin: 60px auto;
    display: flex;
    opacity: .63;
  }

  img {
    border-style: none;
  }

  form {
    display: block;
  }

  button,input {
    overflow: visible;
  }

  
</style>
